/*{baseURL}/admin/resetall
Admin endpoint to erase all data from database
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

const {NoDataError,FormatQueryParamError} = require(path.resolve("customErrors.js")); 

async function resetAllRequest(req,res){

    try{

        if(req.query.format && req.query.format != "json" && req.query.format != "csv"){
            throw(new FormatQueryParamError('Not valid "format" parameter. Try "json", "csv" or nothing.'));
        }

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
                reject(new NoDataError("No data found to delete."));
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

        if(req.query.format == "csv"){
            res.status(200).send([["status"],["OK"]]);
        }
        else{
            res.status(200).send({"status":"OK"});
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
        else if(err instanceof NoDataError){
            if(req.query.format == "csv"){
                res.status(404).send([["status","reason"],["failed",err.message]]);
            }
            else{
                res.status(404).send({"status":"failed","reason":err.message});
            }
            
        }
        else{ // For any other error
            if(req.query.format == "csv"){
                res.status(500).send([["status","reason"],["failed",err.name]]);
            }
            else{
                res.status(500).send({"status":"failed","reason":err.name});
            }
        }
    }

}

router.post('/admin/resetall',resetAllRequest)
module.exports = router; 