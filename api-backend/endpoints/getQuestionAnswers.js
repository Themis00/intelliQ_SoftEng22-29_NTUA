/*{baseURL}/getquestionanswers/:questionnaireID/:questionID

In this endpoint, we get an object that includes all the answers (for 
all sessions) in a specific question of a specific questionnaire. 
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

const {WrongEntryError,NoDataError} = require(path.resolve("customErrors.js")); 

async function getQuestionAnswersRequest(req,res){
    try{

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
                
            await new Promise((resolve,reject) => connection.query(myquery, function (err, result, fields) {

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
                    temp2 = JSON.stringify(result[1])
                }
                else{
                    temp2 = JSON.stringify(result[2])
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
      
        res.status(200).send(JSON.parse(json_str1));
    }

    catch(err){
        if(err.code == "ER_GET_CONNECTION_TIMEOUT"){
            res.status(500).send(err);
        }
        else if(err instanceof WrongEntryError || err instanceof NoDataError){
            res.status(402).send(err);
        }
    }
    
}

router.get('/getquestionanswers/:questionnaireID/:questionID',getQuestionAnswersRequest)
module.exports = router; 