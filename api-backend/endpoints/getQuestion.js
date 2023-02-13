/*. {baseURL}/question/:questionnaireID/:questionID

In this endpoint, we get an object that includes the question info and
options of a specific question of a specific questionnaire
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');
const converter = require('json-2-csv');
const CSV = require('csv-string');

const {WrongEntryError} = require(path.resolve("customErrors.js")); 


async function getQuestionRequest(req,res){

    try{
  
        const pool = require(path.resolve("db_connection/getPool.js"));

        let json_str1 = await new Promise((resolve,reject) => pool.getConnection(async function(err,connection) {
            
            if (err){ // Connection error
                reject(err); // Throw exception outside function
                return;
            } 
            console.log("Connected to db");

            let myquery= "select questionnaireID, qID, qtext, required, type from `questions` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"';"+
                "select optID, opttxt, nextqID from `options` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"'"+ "order by optID";
    
            await new Promise((resolve,reject) => connection.query(myquery, function (err, result, fields) {

                if (err){
                    reject(err);
                    return;
                }
                if(result[0].length == 0){ // If there is no such questionnaire-question pair 
                    reject(new WrongEntryError("Τhere is no such questionnaire-question pair."));
                    return;
                }

                //------------------ Modify JSON in order to have the wanted syntax -----------------------
                let temp1 = JSON.stringify(result[0][0]).slice(0,-1);
                let temp2 = JSON.stringify(result[1]);
                let json_str_inner = temp1 + ",\"options\":" + temp2 + "}";
                //-----------------------------------------------------------------------------------------
                resolve(json_str_inner);
                return;

            })).then((json_str)=>{ // If code runs without errors pass json string outside function
                
                connection.release();
                console.log("Disconnected from db");
                resolve(json_str);
                return;

            }).catch(function(err){ // Throw exception outside function

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

        if(!req.query.format || req.query.format == "json"){
            res.status(200).send(JSON.parse(json_str1));
        }
        else if(req.query.format == "csv"){
            let csv = await converter.json2csvAsync(JSON.parse(json_str1)).catch(function(err){throw err;});
            let arr = CSV.parse(csv);
            res.status(200).send(arr);
        }
        else throw(new WrongEntryError("Not valid \"format\" parameter. Try \"json\", \"csv\" or nothing."));

    }
    catch(err){ // All exception handling takes place here
        if(err.code == "ER_GET_CONNECTION_TIMEOUT"){
            res.status(500).send({"name":"DbConnectionError","message":"No connection to database"});
        }
        else if(err instanceof WrongEntryError){
            res.status(400).send(err);
        }
        else if(err instanceof mariadb.SqlError){
            res.status(400).send({"name":err.name,"code":err.code,"message":err.text}); // For any other sql error
        }
        else{ // For any other error
            res.status(500).send(err);
        }
    }

}

router.get('/question/:questionnaireID/:questionID',getQuestionRequest)
module.exports = router; 
