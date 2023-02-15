/*{baseURL}/getquestionanswers/:questionnaireID/:questionID

In this endpoint, we get an object that includes all the answers (for 
all sessions) in a specific question of a specific questionnaire. 
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');
const converter = require('json-2-csv');
const CSV = require('csv-string');

const {WrongEntryError,NoDataError,FormatQueryParamError} = require(path.resolve("customErrors.js")); 

async function renameKey ( obj, oldKey, newKey ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }

async function getQuestionAnswersRequest(req,res){
    
    try{

        if(req.query.format && req.query.format != "json" && req.query.format != "csv"){
            throw(new FormatQueryParamError('Not valid "format" parameter. Try "json", "csv" or nothing.'));
        }

        const pool = require(path.resolve("db_connection/getPool.js"));
        let json_str1 = await new Promise((resolve,reject) => pool.getConnection(async function(err,connection) {
            
            if (err){ // Connection error
                reject(err); // Throw exception outside function
                return;
            } 

            console.log("Connected to db");

            let myquery= "select questionnaireID, qID from `questions` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"';"+ 
                "select session, ans_str from `answers` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"'"+ "and ans like '%TXT' order by ans_datetime desc;" +
                "select session, ans from `answers` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"'"+ "and ans not like '%TXT' and ans is not null order by ans_datetime desc";
                
            await new Promise((resolve,reject) => connection.query(myquery, async function (err, result, fields) {

                if (err){
                    reject(err);
                    return;
                }

                if(result[0].length == 0){ // If there is no such questionnaire-question pair
                    reject(new WrongEntryError("There is no such questionnaire-question pair."));
                    return;
                }
                else if(result[1].length == 0 && result[2].length == 0){
                    reject(new NoDataError("No answers found for question " + req.params.questionID + " of questionnaire " + req.params.questionnaireID + "."));
                    return;
                }

                //------------------ Modify JSON in order to have the wanted syntax -----------------------
                let temp1 = JSON.stringify(result[0][0]).slice(0,-1)
                let temp2 = "";
                if(result[1].length != 0){
                    await result[1].forEach( obj => renameKey( obj, 'ans_str', 'ans' ) );
                    temp2 = JSON.stringify(result[1]);
                }
                else{
                    temp2 = JSON.stringify(result[2]);
                }
                let json_str_inner = temp1 + ",\"answers\":" + temp2 + "}";
                //-----------------------------------------------------------------------------------------
                resolve(json_str_inner);
                return;
            }))
            .then((json_str)=>{ // If code runs without errors pass json string outside function
                connection.release();
                console.log("Disconnected from db");
                resolve(json_str);
                return;

            })
            .catch(function(err){ // Throw exception outside function

                if(connection){ // If exception does not occur due to database connection error, release the existent connection
                    connection.release();
                    console.log("Disconnected from db");
                }

                reject(err);
                return;
            });
          
        })).catch(function(err){ // Throw exception outside function
            throw err;  
        });
      
        if(req.query.format == "csv"){

            let json = await JSON.parse(json_str1);
            let csv = await converter.json2csvAsync(json).catch(function(err){throw err;});
            let arr = CSV.parse(csv);

            let ans_csvs = [];
            let ans_csv; 
            let ans_arr;
            for(let i=0; i<json["answers"].length; i++){
                ans_csv = await converter.json2csvAsync(json["answers"][i]).catch(function(err){throw err;});
                ans_arr = CSV.parse(ans_csv);
                ans_csvs.push(ans_arr);
            }

            arr[1][2] = ans_csvs;

            res.status(200).send(arr);
        }
        else{
            res.status(200).send(JSON.parse(json_str1));
        }
        
    }

    catch(err){
        if(err instanceof FormatQueryParamError){
            res.status(400).send(err);
        }
        else if(err.code == "ER_GET_CONNECTION_TIMEOUT"){
            if(req.query.format == "csv"){
                res.status(500).send([["name","message"],["DbConnectionError","No connection to database"]]);
            }
            else{
                res.status(500).send({"name":"DbConnectionError","message":"No connection to database"});
            }
        }
        else if(err instanceof WrongEntryError){ // Wrong parameters
            if(req.query.format == "csv"){
                res.status(400).send([["name","message"],[err.name,err.message]]);
            }
            else{
                res.status(400).send(err);
            }
        }
        else if(err instanceof NoDataError){ // No answer inserts
            if(req.query.format == "csv"){
                res.status(404).send([["name","message"],[err.name,err.message]]);
            }
            else{
                res.status(404).send(err);
            }
        }
        else if(err instanceof mariadb.SqlError){ // For any other sql error
            if(req.query.format == "csv"){
                res.status(400).send([["name","code","message"],[err.name,err.code,err.text]]);
            }
            else{
                res.status(400).send({"name":err.name,"code":err.code,"message":err.text});
            }
        }
        else{ // For any other error
            res.status(500).send(err);
        }
    }
    
}

router.get('/getquestionanswers/:questionnaireID/:questionID',getQuestionAnswersRequest)
module.exports = router; 