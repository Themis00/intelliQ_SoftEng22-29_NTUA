/*{baseURL}/admin/questionnaire_upd 
Admin endpoint to upload or update a questionnaire
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

const {WrongEntryError} = require(path.resolve("customErrors.js"));

async function questionnaire_update(req,res){

    try{

        console.log("1");
        // Define 4 flags to note error in a specific part of data insertion
        let questionnaireErrorFlag = 0;
        let keywordErrorFlag = 0;
        let questionErrorFlag = 0;
        let optionErrorFlag = 0;
        
        const pool = require(path.resolve("db_connection/getPool.js"));
        
        await new Promise((resolve,reject) => pool.getConnection(async function(err,connection) {
            console.log("2");
            if (err){
                console.log("2.err");
                reject(err);
                return;
            }
            
            console.log("Connected to db");
            
            // Insert questionnaire data
            let questionnaireID = req.body.questionnaireID;
            let questionnaireTitle =req.body.questionnaireTitle;
            let myquery= "insert into `questionnaire` values (" + "'" + questionnaireID + "'" + "," + "'" + questionnaireTitle + "'" + ");";
            
            await new Promise((resolve,reject) => connection.query(myquery, function (err, result, fields) {
                console.log("3");
                if (err){
                    console.log("3.err");
                    questionnaireErrorFlag = 1;
                    reject(err);
                    return;
                }
                resolve();
                return;
            }))
            .catch(function(err){ // Throw exception outside function, release the existent connection
                console.log("3.catch");
                if(connection){ // If exception does not occur due to database connection error, release the existent connection
                    connection.release();
                    console.log("Disconnected from db");
                }
                reject(err);
                return;
            });
            
            if(questionnaireErrorFlag == 0){ // Continue to next steps only if questionnaire data inserted without errors
                console.log("4");
                // Insert keywords data
                let keywords = req.body.keywords;
                myquery = "insert into `keywords` values ";
                for(let i=0; i<keywords.length; i++){
                    myquery += "(" + "'" + keywords[i] + "'," + "'" + questionnaireID + "')"; // Add every keyword tuple in the query string
                    if(i < keywords.length - 1){
                        myquery += ",";
                    }
                    else{
                        myquery += ";";
                    }
                }

                await new Promise((resolve,reject) => connection.query(myquery, function (err, result, fields) {
                    console.log("4.1");
                    if (err){
                        console.log("4.1.err");
                        keywordErrorFlag = 1;
                        reject(err);
                        return;
                    }
                    resolve();
                    return;
                })).catch(function(err){ // Throw exception outside function, release the existent connection
                    console.log("4.1.catch");
                    if(connection){ // If exception does not occur due to database connection error, release the existent connection
                        connection.release();
                        console.log("Disconnected from db");
                    }
                    reject(err);
                    return;
                });

                if(keywordErrorFlag == 0){ // Continue to next steps only if keywords data inserted without errors
                    console.log("5");
                    // Insert questions data
                    let questionsList = req.body.questions;
                    myquery = "insert into `questions` values ";
                    for(let i=0; i<questionsList.length; i++){
                        myquery += "(" + "'" + questionsList[i]["qID"] + "'," + "'" + questionsList[i]["qtext"] + "'," + "'" + questionsList[i]["required"] + "'," + "'" + questionsList[i]["type"] + "'," + "'" + questionnaireID + "')";
                        if (i < questionsList.length-1){ // If we have more options left to add
                            myquery += ","
                        }
                        else{
                            myquery += ";"
                        }
                    }
                
                    await new Promise((resolve,reject) => connection.query(myquery, function (err, result, fields) {
                        console.log("5.1");
                        if (err){
                            console.log("5.1.err");
                            questionErrorFlag = 1;
                            reject(err);
                            return;
                        }
                        resolve();
                        return;
                    })).catch(function(err){ // Throw exception outside function, release the existent connection
                        console.log("5.1.catch");
                        if(connection){ // If exception does not occur due to database connection error, release the existent connection
                            connection.release();
                            console.log("Disconnected from db");
                        }
                        reject(err);
                        return;
                    });

                    if(questionErrorFlag == 0){ // Continue to next steps only if questions data inserted without errors
                        console.log("6");
                        // Insert options data
                        let optionList = questionsList[0]["options"]; // Initialize list of options of a question 
                        
                        for(let i=0; i<questionsList.length; i++){ // For all questions
                            optionList = questionsList[i]["options"]; // Update option list for current question
                            myquery = "insert into `options` values "; // Reset query string for options insert
                            for(let j=0; j<optionList.length; j++){ // Add every option tuple of a question in the query string
                                if(optionList[j]["nextqID"] != "-"){
                                    myquery += "(" + "'" + optionList[j]["optID"] + "'," + "'" + optionList[j]["opttxt"] + "'," + "'" + optionList[j]["nextqID"] + "'," + "'" + questionsList[i]["qID"] + "'," + "'" + questionnaireID + "')"; 
                                }
                                else{ // If nextqID = '-', that is there is not next question, insert the value null in the corresponding database column
                                    myquery += "(" + "'" + optionList[j]["optID"] + "'," + "'" + optionList[j]["opttxt"] + "'," + "null," + "'" + questionsList[i]["qID"] + "'," + "'" + questionnaireID + "')"; 
                                }
                                if (j < optionList.length-1){ // If we have more options left to add
                                    myquery += ","
                                }
                                else{
                                    myquery += ";"
                                }
                            }

                            await new Promise((resolve,reject) => connection.query(myquery, function (err, result, fields) {
                                console.log("6.1");
                                if (err){
                                    optionErrorFlag = 1;
                                    console.log("6.1.err");
                                    reject(err);
                                    return;
                                }
                                resolve();
                                return;
                            }))
                            .then(()=>{ // If code runs without errors
                                console.log("6.1.then");
                                if(i == questionsList.length - 1){ // After the last insert release the connection
                                    connection.release();
                                console.log("Disconnected from db");
                                }
                                resolve();
                                return;
                            })
                            .catch(function(err){ // Throw exception outside function, release the existent connection
                                console.log("6.1.catch");
                                if(connection){ // If exception does not occur due to database connection error, release the existent connection
                                    connection.release();
                                    console.log("Disconnected from db");
                                }
                                reject(err);
                                return;
                            });
                            
                            if(optionErrorFlag == 1) break; // If there is a wrong option input, stop inserting
                        }
                    }
                }
            }

        })).catch(function(err){ // Throw exception outside function
            console.log("catch_err");
            throw err;  
        });
        console.log("ok");
        res.status(200).send({"status":"Success"}); 
    }
    
    catch(err){
        console.log("catch_err_2");
        if(err.code == "ER_GET_CONNECTION_TIMEOUT"){
            res.status(500).send({"name":err.code,"message":err.text});
        }
        else{
            res.status(400).send(err);
        }
    }

}

router.post('/admin/questionnaire_upd',questionnaire_update)
module.exports = router;