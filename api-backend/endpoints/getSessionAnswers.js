/*{baseURL}/getsessionanswers/:questionnaireID/:session

In this endpoint, we get an object that includes all the answers to the
questions of a specific questionnaire given in a specific session 
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

const {WrongEntryError,NoDataError} = require(path.resolve("customErrors.js")); 

async function getSessionAnswersRequest(req,res){

    try{
        const pool = require(path.resolve("db_connection/getPool.js"));
        let json_str1 = await new Promise((resolve,reject) => pool.getConnection(async function(err,connection) {
            
            if (err){ // Connection error
                reject(err); // Throw exception outside function
                return;
            } 
            
            console.log("Connected to db");

            let myquery= "select questionnaireID from `questionnaire` where questionnaireID =" + "'" + req.params.questionnaireID+"';"+
                "select session from `participant` where session =" + "'" + req.params.session+"';"+
                "select qID, ans, ans_str from `answers` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and session =" + "'" + req.params.session+"'"+ "and ans is not null order by qID";
            
            await new Promise((resolve,reject) => connection.query(myquery, function (err, result, fields) {
                
                if (err){
                    reject(err);
                    return;
                }

                if(result[0].length == 0){ // If there is no such questionnaire
                    reject(new WrongEntryError("There is no such questionnaire."));
                    return;
                }
                else if(result[1].length == 0){ // If there is no such session
                    reject(new WrongEntryError("There is no such session."));
                    return;
                }
                else if(result[2].length == 0){ // If session was created for another questionnaire or no answers were given
                    reject(new NoDataError("Session " + req.params.session + " is not for questionnaire " + req.params.questionnaireID + " or all answers are null."));
                    return;
                }
                
                //------------------ Modify JSON in order to have the wanted syntax -----------------------
                let temp1 = JSON.stringify(result[0][0]).slice(0,-1);
                let temp2 = JSON.stringify(result[1][0]).slice(0,-1).slice(1);
                for(let i=0; i<result[2].length; i++){ // Delete empty answer strings from multiple choice question answers
                    if(result[2][i]["ans_str"] == null){
                        delete result[2][i].ans_str;
                    }
                    else{
                        delete result[2][i].ans; // If the answer has an answer string, the option selected (ans) is the only option and can be omitted
                    }
                }
                let temp3 = JSON.stringify(result[2]);
                let json_str_inner = temp1 + "," + temp2 + ",\"answers\":" + temp3 + "}";
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
            res.status(500).send({"name":"DbConnectionError","message":"No connection to database"});
        }
        else if(err instanceof WrongEntryError){
            res.status(400).send(err);
        }
        else if(err instanceof NoDataError){
            res.status(404).send(err);
        }
        else if(err instanceof mariadb.SqlError){
            res.status(400).send({"name":err.name,"code":err.code,"message":err.text}); // For any other sql error
        }
        else{ // For any other error
            res.status(500).send(err);
        }
    }

}

router.get('/getsessionanswers/:questionnaireID/:session',getSessionAnswersRequest)
module.exports = router; 