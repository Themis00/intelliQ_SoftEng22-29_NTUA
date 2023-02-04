/*{baseURL}/admin/resetall
Admin endpoint to erase all data from database
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

const {WrongEntryError} = require(path.resolve("customErrors.js")); 

async function resetAllRequest(req,res){

    try{

        const pool = require(path.resolve("db_connection/getPool.js"));
        
        await new Promise((resolve,reject) => pool.getConnection(async function(err,connection) {
            
            if (err){ // Connection error
                reject(err); // Throw exception outside function
                return;
            } 
            
            console.log("Connected to db");
            
            //--- Check if there are data inserted. Checking questionnaires and sessions is enough, due to foreign key constraints ----------
            let myquery = "select questionnaireID from `questionnaire`; select session from participant";
            
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

            if(help_result[0].length == 0 && help_result[1].length == 0){ // If there are no questionnaire and participant inserts
                if(connection){
                    connection.release();
                    console.log("Disconnected from db");
                }
                reject(new WrongEntryError("No data found to delete."));
                return;
            }
            //-------------------------------------------------------------------------------------------------------------------------------

            myquery= "delete from questionnaire; delete from participant;"; // Due to foreign key constraints, if we delete questionnaire and participant inserts all other inserts get deleted as well.
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
            res.status(402).send({"status":"failed","reason":err.message});
        }
    }

}

router.post('/admin/resetall',resetAllRequest)
module.exports = router; 