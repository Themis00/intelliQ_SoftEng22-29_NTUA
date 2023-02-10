/*{baseURL}/admin/resetq/:questionnaireID
Admin endpoint to delete all answers given in a specific questionnaire
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

const {WrongEntryError, NoDataError} = require(path.resolve("customErrors.js")); 

async function resetqRequest(req,res){

    try{
        
        const pool = require(path.resolve("db_connection/getPool.js"));
        
        await new Promise((resolve,reject) => pool.getConnection(async function(err,connection) {
            
            if (err){ // Connection error
                reject(err); // Throw exception outside function
                return;
            } 

            console.log("Connected to db");

            //------ Check if questionnaire exists and if there are answers of this questionnaire inserted -------------------------------
            let myquery = "select questionnaireID from `questionnaire` where questionnaireID =" + "'" + req.params.questionnaireID+"';" +
                "select ans from `answers` where questionnaireID =" + "'" + req.params.questionnaireID+"';";
            
            help_result = await new Promise((resolve,reject) => connection.query(myquery, function (err, result, fields) {
             
                if (err){
                    reject(err);
                    return;
                }
              
                resolve(result);
                return;
            }))
            .catch(function(err){ // Throw exception outside function, release the existent connection
                if(connection){ // If exception does not occur due to database connection error, release the existent connection
                    connection.release();
                    console.log("Disconnected from db");
                }
                reject(err);
                return;
            });

            if(help_result[0].length == 0){ // If there is no such questionnaire
                if(connection){
                    connection.release();
                    console.log("Disconnected from db");
                }
                reject(new WrongEntryError("There is no such questionnaire."));
                return;
            }
            else if(help_result[1].length == 0){ // If there are no answer inserts in this questionnaire
                if(connection){
                    connection.release();
                    console.log("Disconnected from db");
                }
                reject(new NoDataError("No answers found to delete for questionnaire "+ req.params.questionnaireID+"."));
                return;
            }
            //----------------------------------------------------------------------------------------------------------------------------
            
            myquery= "delete from `answers` where questionnaireID =" + "'" + req.params.questionnaireID + "';";
            
            await new Promise((resolve,reject) => connection.query(myquery, function (err, result, fields) {
                if (err){ // Connection error
                    reject(err); // Throw exception outside function
                    return;
                }
                resolve();
                return; 
            }))
            .then(()=>{ // If code runs without errors
                connection.release();
                console.log("Disconnected from db");
                resolve();
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
      
        res.status(200).send({"status":"OK"});

    }
    catch(err){
        if(err.code == "ER_GET_CONNECTION_TIMEOUT"){
            res.status(500).send({"status":"failed","reason":"No connection to database"});
        }
        else if(err instanceof WrongEntryError){
            res.status(400).send({"status":"failed","reason":err.message});
        }
        else if(err instanceof NoDataError){
            res.status(404).send({"status":"failed","reason":err.message});
        }
        else{ // For any other error
            res.status(500).send({"status":"failed","reason":err.text});
        }
    }

}

router.post('/admin/resetq/:questionnaireID',resetqRequest)
module.exports = router; 