/*{baseURL}/admin/questionnaire_upd 
Admin endpoint to upload or update a questionnaire
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage: storage}).single('questionnaire')

const {WrongEntryError} = require(path.resolve("customErrors.js"));

async function questionnaire_update(req,res){
   
    try{

        await new Promise((resolve,reject) => upload(req,res,async function(err){
            
            if (err instanceof multer.MulterError) { // Check for errors in multer uploading
                reject(err);
                return;
            }
            else if(!req.file){ // If the file with key 'questionnaire' does not exist
                reject(new WrongEntryError("The questionnaire must be uploaded in a JSON file with key 'questionnaire'."));
                return;
            }
            else if(req.file.mimetype != "application/json"){
                reject(new WrongEntryError("The questionnaire must be uploaded in a JSON file with key 'questionnaire'."));
                return;
            }

            try{ // If JSON file has syntax errors
                var body = JSON.parse(req.file.buffer.toString());
            }
            catch(err){
                reject(err);
                return;
            }
           
            console.log("1");
            // Define 4 flags to note error in a specific part of data insertion
            let questionnaireErrorFlag = 0;
            let keywordErrorFlag = 0;
            let questionErrorFlag = 0;
            let optionErrorFlag = 0;

            let errorMessage = ""; // Tn this variable we will save the error message of the custom error thrown in some cases
            
            const pool = require(path.resolve("db_connection/getPool.js"));
            
            await new Promise((resolve,reject) => pool.getConnection(async function(err,connection) {
                console.log("2");
                if (err){
                    console.log("2.err");
                    reject(err);
                    return;
                }
                
                console.log("Connected to db");
                
                // Insert questionnaire data-----------------------------------------------------------------------------------------------------
                let questionnaireID = body.questionnaireID;
                let questionnaireTitle = body.questionnaireTitle;

                if(questionnaireID == null){
                    errorMessage = "questionnaireID can't be null.";
                    questionnaireErrorFlag = 1;
                }
                else if(typeof questionnaireID != "string"){
                    errorMessage = "questionnaireID must be a string.";
                    questionnaireErrorFlag = 1;
                }
                else if(questionnaireID.length == 0 || questionnaireID.length > 5){
                    errorMessage = "questionnaireID length must be between 1 and 5.";
                    questionnaireErrorFlag = 1;
                }

                if(questionnaireErrorFlag == 1){ // If an error occured at questionnaire insertion
                    reject(new WrongEntryError(errorMessage));
                    return;
                }

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
                
            //-------------------------------------------------------------------------------------------------------------------------------
                if(questionnaireErrorFlag == 0){ // Continue to next steps only if questionnaire data inserted without errors
                    console.log("4");

                    // Insert keywords data
                    let keywords = body.keywords;

                    if(keywords != null && !(Array.isArray(keywords)) && typeof keywords != "string"){ // Keywords are not required. Every keyword should be is a string, or an array of strings if multiple
                        console.log("4.1");
                        errorMessage = "Keywords must be a string or an array of strings. They are optional.";
                        keywordErrorFlag = 1;
                    }

                    if(typeof keywords == "string"){
                        if(keywords.length == 0){
                            console.log("4.2");
                            errorMessage = "A keyword length cannot be zero. Try null value instead.";
                            keywordErrorFlag = 1;
                        }
                        else{
                            myquery = "insert into `keywords` values (" + "'" + keywords + "'," + "'" + questionnaireID + "')";
                        }
                    }
                    else if(Array.isArray(keywords)){
                        if(keywords.length == 0){
                            console.log("4.3");
                            errorMessage = "Keywords cannot be a empty array. Try null value instead.";
                            keywordErrorFlag = 1;
                        }
                        else{
                            myquery = "insert into `keywords` values ";
                            for(let i=0; i<keywords.length; i++){

                                if(typeof keywords[i] != "string"){
                                    console.log("4.4");
                                    errorMessage = "Every keyword in the array must be a string. Try null instead of an array if you do not want any keywords.";
                                    keywordErrorFlag = 1;
                                    break;
                                }
                                else if(keywords[i].length == 0){
                                    console.log("4.5");
                                    errorMessage = "A keyword cannot have length 0.";
                                    keywordErrorFlag = 1;
                                    break;
                                }
                                else{
                                    myquery += "(" + "'" + keywords[i] + "'," + "'" + questionnaireID + "')"; // Add every keyword tuple in the query string
                                    if(i < keywords.length - 1){
                                        myquery += ",";
                                    }
                                    else{
                                        myquery += ";";
                                    }
                                }
                            }
                        }
                    }
                    
                    if(keywordErrorFlag == 1){ // If an error occured at keywords insertion
                        
                        console.log("Delete error data inserted 1");
                        myquery = "delete from `questionnaire` where questionnaireID =" + "'" + questionnaireID + "';";

                        await new Promise((resolve,reject) => connection.query(myquery, function (err, result, fields) { // Firstly delete all previous data inserted
                            if (err){
                                reject(err);
                                return;
                            }
                            if(connection){ // If exception does not occur due to database connection error, release the existent connection
                                connection.release();
                                console.log("Disconnected from db");
                            }
                            resolve();
                            return;
                        }))
                        .catch(function(err){ // Throw exception outside function, release the existent connection
                            console.log("test2");
                            if(connection){ // If exception does not occur due to database connection error, release the existent connection
                                connection.release();
                                console.log("Disconnected from db");
                            }
                            reject(err);
                        });

                        reject(new WrongEntryError(errorMessage));
                        return;
                    }
                    
                    if(keywords != null){
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
                            reject(err);
                            return;
                        });
                    }
                    
                //-------------------------------------------------------------------------------------------------------------------------------
                    if(keywordErrorFlag == 0){ // Continue to next steps only if keywords data inserted without errors
                        console.log("5");
                        // Insert questions data
                        
                        let questionsList = body.questions;
                        
                        if(!Array.isArray(questionsList)){
                            errorMessage = "Questions can't be null and must be an array of objects.";
                            questionErrorFlag = 1;
                        }
                        else if(questionsList.length == 0){
                            errorMessage = "The questionnaire must have questions.";
                            questionErrorFlag = 1;
                        }
                        else{

                            myquery = "insert into `questions` values ";
                            
                            for(let i=0; i<questionsList.length; i++){
                                
                                if(typeof questionsList[i] != "object" || questionsList[i] == null){
                                    errorMessage = "Every element of question array must be an object that includes qID, qtext, required and type.";
                                    questionErrorFlag = 1;
                                    break;
                                }
                                else if(typeof questionsList[i]["qID"] != "string" || typeof questionsList[i]["qtext"]!= "string" || typeof questionsList[i]["required"]!= "string" || typeof questionsList[i]["type"]!= "string"){
                                    errorMessage = "qID, qtext, required and type must exist in every element of the array and be strings.";
                                    questionErrorFlag = 1;
                                    break;
                                }
                                else if(questionsList[i]["qID"].length == 0 || questionsList[i]["qID"].length > 3){
                                    errorMessage = "qID length must be between 1 and 3";
                                    questionErrorFlag = 1;
                                    break;
                                }
                                else if(questionsList[i]["qtext"].length == 0){
                                    errorMessage = "Question text length can't be 0.";
                                    questionErrorFlag = 1;
                                    break;
                                }
                                else if(questionsList[i]["required"] != "TRUE" && questionsList[i]["required"]!= "FALSE"){
                                    errorMessage = "Required value must be \"TRUE\" or \"FALSE\"";
                                    questionErrorFlag = 1;
                                    break;
                                }
                                else if(questionsList[i]["type"] != "profile" && questionsList[i]["type"]!= "question"){
                                    errorMessage = "Type value must be \"profile\" or \"question\"";
                                    questionErrorFlag = 1;
                                    break;
                                }
                                else{
                                    myquery += "(" + "'" + questionsList[i]["qID"] + "'," + "'" + questionsList[i]["qtext"] + "'," + "'" + questionsList[i]["required"] + "'," + "'" + questionsList[i]["type"] + "'," + "'" + questionnaireID + "')";
                                    if (i < questionsList.length-1){ // If we have more options left to add
                                        myquery += ","
                                    }
                                    else{
                                        myquery += ";"
                                    }
                                }
                            
                            }
                        }

                        if(questionErrorFlag == 1){ // If an error occured at question insertion
                        
                            console.log("Delete error data inserted 2");
                            myquery = "delete from `questionnaire` where questionnaireID =" + "'" + questionnaireID + "';";
        
                            await new Promise((resolve,reject) => connection.query(myquery, function (err, result, fields) { // Firstly delete all previous data inserted
                                if (err){
                                    reject(err);
                                    return;
                                }
                                if(connection){ // If exception does not occur due to database connection error, release the existent connection
                                    connection.release();
                                    console.log("Disconnected from db");
                                }
                                resolve();
                                return;
                            }))
                            .catch(function(err){ // Throw exception outside function, release the existent connection
                                console.log("test2");
                                if(connection){ // If exception does not occur due to database connection error, release the existent connection
                                    connection.release();
                                    console.log("Disconnected from db");
                                }
                                reject(err);
                            });
        
                            reject(new WrongEntryError(errorMessage));
                            return;
                        }
                        else{
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
                                reject(err);
                                return;
                            });
                        }
                    
                    //-------------------------------------------------------------------------------------------------------------------------------
                        if(questionErrorFlag == 0){ // Continue to next steps only if questions data inserted without errors
                            console.log("6");
                            // Insert options data
                            let optionList = questionsList[0]["options"]; // Initialize list of options of a question 
                            let qIDFound // Helping variable

                            for(let i=0; i<questionsList.length; i++){ // For all questions
                                //console.log(i);
                                optionList = questionsList[i]["options"]; // Update option list for current question

                                if(!Array.isArray(optionList)){
                                    errorMessage = "Options of a question can't be null and must be an array of objects.";
                                    optionErrorFlag = 1;
                                    break;
                                }
                                else if(optionList.length == 0){
                                    errorMessage = "A question must have options";
                                    optionErrorFlag = 1;
                                    break;
                                }
                                else{
                                    myquery = "insert into `options` values "; // Reset query string for options insert
                                    
                                    for(let j=0; j<optionList.length; j++){ // Add every option tuple of a question in the query string
                                        
                                        if(typeof optionList[j] != "object" || optionList[j] == null){
                                            errorMessage = "Every element of option array must be an object that includes optID, opttxt and nextqID.";
                                            optionErrorFlag = 1;
                                            break;
                                        }
                                        else if(typeof optionList[j]["optID"] != "string" || typeof optionList[j]["opttxt"]!= "string" || typeof optionList[j]["nextqID"]!= "string"){
                                            errorMessage = "optID, opttxt and nextqID must exist in every element of the array and be strings.";
                                            optionErrorFlag = 1;
                                            break;
                                        }
                                        else if(optionList[j]["optID"].length == 0 || optionList[j]["optID"].length > 6){
                                            errorMessage = "optID length must be between 1 and 6";
                                            optionErrorFlag = 1;
                                            break;
                                        }
                                        else if(optionList[j]["opttxt"].length == 0){
                                            errorMessage = "Option text length can't be 0.";
                                            optionErrorFlag = 1;
                                            break;
                                        }
                                        else if(optionList[j]["nextqID"].length == 0 || optionList[j]["nextqID"].length > 3){
                                            errorMessage = "nextqID addressed to qID and so its length must be between 1 and 3";
                                            optionErrorFlag = 1;
                                            break;
                                        }
                                        else if(optionList[j]["optID"].includes("TXT") && optionList.length > 1){
                                            errorMessage = "If one option includes open string, there can't be another option.";
                                            optionErrorFlag = 1;
                                            break;
                                        }
                                        else{
                                            // Find if the nextqID of the current option addresses to a previous question, in order to reject error
                                            qIDFound = await new Promise((resolve) => resolve(questionsList.slice(0,i).find(question => question.qID == optionList[j]["nextqID"])));
                                            if(qIDFound != null){
                                                errorMessage = "The nextqID cannot address to a previous question. It can only be the qID of a following question or \"-\"";
                                                optionErrorFlag = 1;
                                                break;
                                            }

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

                                        if(optionErrorFlag == 1) break; // If there is a wrong option input, stop inserting
                                    }

                                    if(optionErrorFlag == 1){ // If an error occured at option insertion
                        
                                        console.log("Delete error data inserted 3");
                                        myquery = "delete from `questionnaire` where questionnaireID =" + "'" + questionnaireID + "';";
                    
                                        await new Promise((resolve,reject) => connection.query(myquery, function (err, result, fields) { // Firstly delete all previous data inserted
                                            if (err){
                                                reject(err);
                                                return;
                                            }
                                            if(connection){ // If exception does not occur due to database connection error, release the existent connection
                                                connection.release();
                                                console.log("Disconnected from db");
                                            }
                                            resolve();
                                            return;
                                        }))
                                        .catch(function(err){ // Throw exception outside function, release the existent connection
                                            console.log("test2");
                                            if(connection){ // If exception does not occur due to database connection error, release the existent connection
                                                connection.release();
                                                console.log("Disconnected from db");
                                            }
                                            reject(err);
                                        });
                    
                                        reject(new WrongEntryError(errorMessage));
                                        return;
                                    }
                                    else{
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
                                        
                                        .catch(function(err){ // Throw exception outside function, release the existent connection
                                            console.log("6.1.catch");
                                            reject(err);
                                            return;
                                        });
                                    }
                                }

                                if(optionErrorFlag == 1) break; // If there is a wrong option input, stop inserting
                                else if(i == questionsList.length - 1){
                                    connection.release();
                                    console.log("Disconnected from db1");
                                }
                            }
                        }
                    }
                }
            
                if(questionnaireErrorFlag == 0 && (keywordErrorFlag == 1 || questionErrorFlag == 1 || optionErrorFlag == 1)){ // If an error has occured and there are data that are not deleted delete them
                    console.log("Delete error data inserted");
                    myquery = "delete from `questionnaire` where questionnaireID =" + "'" + questionnaireID + "';";

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
                }

                resolve();
                return;

            })).catch(function(err){ // Throw exception outside function
                console.log("catch_err");
                reject(err);
                return;  
            });
        
        resolve();
        return;
        }))
        console.log("ok");
        res.status(200).send({"status":"Success"}); 
        
    }
    catch(err){
        console.log("catch_err_2");
        if(err.code == "ER_GET_CONNECTION_TIMEOUT"){
            res.status(500).send({"name":"DbConnectionError","message":"No connection to database"});
        }
        else if(err instanceof SyntaxError || err instanceof multer.MulterError){
            res.status(400).send({"name":err.name,"message":err.message});
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

router.post('/admin/questionnaire_upd',questionnaire_update)
module.exports = router;