/*{baseURL}/session

In this endpoint, we generate a random session string, 
we save it in the database and finally return it
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

const {FormatQueryParamError, InsertTimeoutError} = require(path.resolve("customErrors.js"));

async function randomSession(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

async function startSessionRequest(req,res){

    let sessionEntry = ""; // Initialize the random generated session variable

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

            let errFlag = false; // indicates if a session has already been inserted
            let otherErrFlag = false; // indicates if another error has occured
            let tryCounter = 0; // Counters the times that insertion has failed due to foreign key constraint

            do{

                errFlag = false;
                sessionEntry = await randomSession(4);
                myquery = "insert into `participant` values ('"+sessionEntry+"')";
                
                await new Promise((resolve,reject) => connection.query(myquery, function (err, result, fields) {
                    if (err){
                        reject(err);
                        return;
                    }
                    resolve();
                    return;
                }))
                .catch(function(err){ // Throw exception outside function, release the existent connection
                    if(err.code == "ER_DUP_ENTRY"){
                        errFlag = true;
                        tryCounter++;
                        return;
                    }
                    else{
                        otherErrFlag = true;
                        reject(err);
                        return;
                    }  
                });
      
            } while(errFlag && !otherErrFlag && tryCounter < 30);

            if(otherErrFlag){
                if(connection){ // If exception does not occur due to database connection error, release the existent connection
                    connection.release();
                    console.log("Disconnected from db");
                }
                reject(err);
                return;
            }

            if(tryCounter == 30){
                connection.release();
                console.log("Disconnected from db");
                reject(new InsertTimeoutError("Session insertion has failed."))
                return;
            }

            connection.release();
            console.log("Disconnected from db");
            resolve();
            return;

        })).catch(function(err){
            throw err;  
        });
        
        if(req.query.format == "csv"){
            res.status(200).send([["session"],[sessionEntry]]);
        }
        else{
            res.status(200).send({"session":sessionEntry});
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
        else if(err instanceof InsertTimeoutError){
            if(req.query.format == "csv"){
                res.status(500).send([["name","code","message"],[err.name,err.code,err.message]]);
            }
            else{
                res.status(500).send({"name":err.name,"code":err.code,"message":err.message});
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

router.get('/admin/session',startSessionRequest)
module.exports = router; 