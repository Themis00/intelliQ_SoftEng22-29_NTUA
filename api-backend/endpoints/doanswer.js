/*{baseURL}/doanswer/:questionnaireID/:questionID/:session/:optionID

In this endpoint, we insert an answer to the database
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

const {WrongEntryError,FormatQueryParamError} = require(path.resolve("customErrors.js"));

async function insertanswer(req,res){
    
    try{

        if(req.query.format && req.query.format != "json" && req.query.format != "csv"){
            throw(new FormatQueryParamError('Not valid "format" parameter. Try "json", "csv" or nothing.'));
        }
        
        const pool = require(path.resolve("db_connection/getPool.js"));
        
        await new Promise((resolve,reject) => pool.getConnection(async function(err,connection) {

            if (err){
                reject(err);
                return;
            }

            console.log("Connected to db");

            //--- Get data to check if questionnaire-question pair exists, if question is required and if insert answer is one of the options --------------------------------
            let myquery = "select required from `questions` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"';" + 
                "select session from `participant` where session =" + "'" + req.params.session+"';"+
                "select optID from `options` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"'";
            
            let help_result = await new Promise((resolve,reject) => connection.query(myquery, function (err, result, fields) {
                if (err){
                    reject(err);
                    return;
                }
                
                resolve(result);
            }))
            .catch(function(err){ // Throw exception outside function, release the existent connection
                
                if(connection){ // If exception does not occur due to database connection error, release the existent connection
                    connection.release();
                    console.log("Disconnected from db");
                }

                reject(err);
                return;
            });
            //----------------------------------------------------------------------------------------------------------------------------------------------------------------
            
            let optFound = await new Promise((resolve) => resolve(help_result[2].find(opt => opt.optID == req.params.optionID)));
            
            if(help_result[0].length == 0){ // If there is no such questionnaire-question pair
                
                if(connection){
                    connection.release();
                    console.log("Disconnected from db");
                }
                reject(new WrongEntryError("There is no such questionnaire-question pair."));
                return;
            }
            else if(help_result[1].length == 0){ // If there is no such session
                
                if(connection){
                    connection.release();
                    console.log("Disconnected from db");
                }
                reject(new WrongEntryError("There is no such session."));
                return;
            }
            else if(optFound == null && req.params.optionID != null){ // If there is no such option for the given question
                
                if(connection){
                    connection.release();
                    console.log("Disconnected from db");
                }
                reject(new WrongEntryError("There is no option " + req.params.optionID + " in question " + req.params.questionID + " of questionnaire " + req.params.questionnaireID + "."));
                return;
            }
            
            myquery = ""; // Initialize the query 
            
            if(help_result[0][0].required == "TRUE"){ // If the question is required (required = "TRUE")
                
                if(req.params.optionID == null){
                    if(connection){
                        connection.release();
                        console.log("Disconnected from db");
                    }
                    reject(new WrongEntryError("It is required to answer."));
                    return;
                }
                else if(req.params.optionID.includes("TXT")){ // If the option includes open string as answer
                    
                    if(req.body.ans_str == null){
                        if(connection){
                            connection.release();
                            console.log("Disconnected from db");
                        }
                        reject(new WrongEntryError("It is required to answer."));
                        return;
                    }
                    else{
                        myquery += "insert into `answers` values ("+"'"+req.params.optionID+"'"+","+"'"+req.params.questionnaireID+"'"+","+"'"+req.params.session+"'"+","+"'"+req.params.questionID+"'"+",current_timestamp(),"+"'"+req.body.ans_str+"'"+");"; 
                    }

                }
                else{
                    if(req.body.ans_str == null){
                        myquery += "insert into `answers` values ("+"'"+req.params.optionID+"'"+","+"'"+req.params.questionnaireID+"'"+","+"'"+req.params.session+"'"+","+"'"+req.params.questionID+"'"+",current_timestamp(),null);";
                    }
                    else{
                        if(connection){
                            connection.release();
                            console.log("Disconnected from db");
                        }
                        reject(new WrongEntryError("Multiple choice question cannot have an answer string."));
                        return;
                    }
                }

            }
            else{
            
                if(req.params.optionID == null){
                    
                    if(req.body.ans_str == null){
                        myquery += "insert into `answers` values (null,"+"'"+req.params.questionnaireID+"'"+","+"'"+req.params.session+"'"+","+"'"+req.params.questionID+"'"+",current_timestamp(),null);";
                    }
                    else{
                        if(connection){
                            connection.release();
                            console.log("Disconnected from db");
                        }
                        reject(new WrongEntryError("The choice not to answer the question cannot have an answer string."));
                        return;
                    }
                
                }
                else if(req.params.optionID.includes("TXT")){ // If the option includes open string as answer
                    
                    if(req.body.ans_str == null){
                        if(connection){
                            connection.release();
                            console.log("Disconnected from db");
                        }
                        reject(new WrongEntryError("The option " + req.params.optionID + " requires an answer string"));
                        return;
                    }
                    else{
                        myquery += "insert into `answers` values ("+"'"+req.params.optionID+"'"+","+"'"+req.params.questionnaireID+"'"+","+"'"+req.params.session+"'"+","+"'"+req.params.questionID+"'"+",current_timestamp(),"+"'"+req.body.ans_str+"'"+");"; 
                    }

                }
                else{
                    if(req.body.ans_str == null){
                        myquery += "insert into `answers` values ("+"'"+req.params.optionID+"'"+","+"'"+req.params.questionnaireID+"'"+","+"'"+req.params.session+"'"+","+"'"+req.params.questionID+"'"+",current_timestamp(),null);";
                    }
                    else{
                        if(connection){
                            connection.release();
                            console.log("Disconnected from db");
                        }
                        reject(new WrongEntryError("Multiple choice question cannot have an answer string."));
                        return;
                    }
                }

            }
 
            await new Promise((resolve,reject) => connection.query(myquery, function (err, result, fields) {
                if (err){
                    reject(err);
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

            })
            .catch(function(err){ // Throw exception outside function, release the existent connection

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
   
        res.status(204).send();
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
        else if(err.code == "ER_DUP_ENTRY"){
            if(req.query.format == "csv"){
                res.status(400).send([["name","message"],["DuplicateEntry","This question has already been answered in this session"]]);
            }
            else{
                res.status(400).send({"name":"DuplicateEntry","message":"This question has already been answered in this session"});
            }
        }
        else if(err instanceof WrongEntryError){
            if(req.query.format == "csv"){
                res.status(400).send([["name","message"],[err.name,err.message]]);
            }
            else{
                res.status(400).send(err);
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

router.post('/doanswer/:questionnaireID/:questionID/:session/:optionID?',insertanswer)
module.exports = router; 