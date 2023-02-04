/*{baseURL}/doanswer/:questionnaireID/:questionID/:session/:optionID

In this endpoint, we insert an answer to the database
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

const {WrongEntryError} = require(path.resolve("customErrors.js"));

async function insertanswer(req,res){
    console.log("1");
    try{
        
        const pool = require(path.resolve("db_connection/getPool.js"));
        console.log("2");
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
                console.log("3.1");    
                resolve(result);
            }))
            .catch(function(err){ // Throw exception outside function, release the existent connection
                console.log("3.2");
                if(connection){ // If exception does not occur due to database connection error, release the existent connection
                    connection.release();
                    console.log("Disconnected from db");
                }

                reject(err);
                return;
            });
            //----------------------------------------------------------------------------------------------------------------------------------------------------------------
            console.log("4");
            let optFound = await new Promise((resolve) => resolve(help_result[2].find(opt => opt.optID == req.params.optionID)));
            
            if(help_result[0].length == 0){ // If there is no such questionnaire-question pair
                console.log("4.1");
                if(connection){
                    connection.release();
                    console.log("Disconnected from db");
                }
                reject(new WrongEntryError("There is no such questionnaire-question pair."));
                return;
            }
            else if(help_result[1].length == 0){ // If there is no such session
                console.log("4.2");
                if(connection){
                    connection.release();
                    console.log("Disconnected from db");
                }
                reject(new WrongEntryError("There is no such session."));
                return;
            }
            else if(optFound == null && req.params.optionID != null){ // If there is no such option for the given question
                console.log("4.3");
                if(connection){
                    connection.release();
                    console.log("Disconnected from db");
                }
                reject(new WrongEntryError("There is no option " + req.params.optionID + " in question " + req.params.questionID + " of questionnaire " + req.params.questionnaireID + "."));
                return;
            }
            
            myquery = ""; // Initialize the query 
            console.log("5");
            if(help_result[0][0].required == "TRUE"){ // If the question is required (required = "TRUE")
                console.log("5.1");
                if(req.params.optionID == null){
                    if(connection){
                        connection.release();
                        console.log("Disconnected from db");
                    }
                    reject(new WrongEntryError("It is required to answer."));
                    console.log("5.1.1");
                    return;
                }
                else if(req.params.optionID.includes("TXT")){ // If the option includes open string as answer
                    
                    if(req.body.ans_str == null){
                        if(connection){
                            connection.release();
                            console.log("Disconnected from db");
                        }
                        reject(new WrongEntryError("It is required to answer."));
                        console.log("5.1.2.1");
                        return;
                    }
                    else{
                        myquery += "insert into `answers` values ("+"'"+req.params.optionID+"'"+","+"'"+req.params.questionnaireID+"'"+","+"'"+req.params.session+"'"+","+"'"+req.params.questionID+"'"+",current_timestamp(),"+"'"+req.body.ans_str+"'"+");"; 
                        console.log("5.1.2.2");
                    }

                }
                else{
                    if(req.body.ans_str == null){
                        myquery += "insert into `answers` values ("+"'"+req.params.optionID+"'"+","+"'"+req.params.questionnaireID+"'"+","+"'"+req.params.session+"'"+","+"'"+req.params.questionID+"'"+",current_timestamp(),null);";
                        console.log("5.1.3.1");
                    }
                    else{
                        if(connection){
                            connection.release();
                            console.log("Disconnected from db");
                        }
                        reject(new WrongEntryError("Multiple choice question cannot have an answer string."));
                        console.log("5.1.3.2");
                        return;
                    }
                }

            }
            else{
                console.log("5.2");
                if(req.params.optionID == null){
                    
                    if(req.body.ans_str == null){
                        myquery += "insert into `answers` values (null,"+"'"+req.params.questionnaireID+"'"+","+"'"+req.params.session+"'"+","+"'"+req.params.questionID+"'"+",current_timestamp(),null);";
                        console.log("5.2.1.1");
                    }
                    else{
                        if(connection){
                            connection.release();
                            console.log("Disconnected from db");
                        }
                        reject(new WrongEntryError("The choice not to answer the question cannot have an answer string."));
                        console.log("5.2.1.2");
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
                        console.log("5.2.2.1");
                        return;
                    }
                    else{
                        myquery += "insert into `answers` values ("+"'"+req.params.optionID+"'"+","+"'"+req.params.questionnaireID+"'"+","+"'"+req.params.session+"'"+","+"'"+req.params.questionID+"'"+",current_timestamp(),"+"'"+req.body.ans_str+"'"+");"; 
                        console.log("5.2.2.2");
                    }

                }
                else{
                    if(req.body.ans_str == null){
                        myquery += "insert into `answers` values ("+"'"+req.params.optionID+"'"+","+"'"+req.params.questionnaireID+"'"+","+"'"+req.params.session+"'"+","+"'"+req.params.questionID+"'"+",current_timestamp(),null);";
                        console.log("5.2.3.1");
                    }
                    else{
                        if(connection){
                            connection.release();
                            console.log("Disconnected from db");
                        }
                        reject(new WrongEntryError("Multiple choice question cannot have an answer string."));
                        console.log("5.2.3.2");
                        return;
                    }
                }

            }
            console.log("6");
            await new Promise((resolve,reject) => connection.query(myquery, function (err, result, fields) {
                if (err){
                    reject(err);
                    return;
                }
                console.log("7");
                resolve();
                return;
            }))
            .then(()=>{ // If code runs without errors
                connection.release();
                console.log("Disconnected from db");
                console.log("8.1");
                resolve();
                return;

            })
            .catch(function(err){ // Throw exception outside function, release the existent connection

                if(connection){ // If exception does not occur due to database connection error, release the existent connection
                    connection.release();
                    console.log("Disconnected from db");
                }
                console.log("8.2");
                reject(err);
                return;
            });
        
        })).catch(function(err){ // Throw exception outside function
            console.log("10");
            throw err;  
        });
   
        res.status(204).send();
        console.log("11");
    }

    catch(err){
        if(err.code == "ER_GET_CONNECTION_TIMEOUT"){
            res.status(500).send(err);
        }
        else if(err.code == "ER_DUP_ENTRY"){
            res.status(400).send({"name":"ER_DUP_ENTRY","message":"This question has already been answered in this session"});
        }
        else if(err instanceof WrongEntryError){
            res.status(402).send(err);
        }
    }

}

router.post('/doanswer/:questionnaireID/:questionID/:session/:optionID?',insertanswer)
module.exports = router; 