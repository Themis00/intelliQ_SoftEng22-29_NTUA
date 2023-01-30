/*{baseURL}/admin/questionnaire_upd 
Admin endpoint to upload or update a questionnaire
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

function questionnaire_update(req,res){

    const pool = require(path.resolve("db_connection/getPool.js"));
    pool.getConnection(function(err,connection) {
        if (err) throw err;
        console.log("Connected to db");
        
        // Insert questionnaire data
        let questionnaireID = req.body.questionnaireID;
        let questionnaireTitle =req.body.questionnaireTitle;
        let myquery= "insert into `questionnaire` values (" + "'" + questionnaireID + "'" + "," + "'" + questionnaireTitle + "'" + ");";
        connection.query(myquery, function (err, result, fields) {
            if (err) throw err;
        });

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
        connection.query(myquery, function (err, result, fields) {
            if (err) throw err;
        });

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
        connection.query(myquery, function (err, result, fields) {
            if (err) throw err;
        });
        
        // Insert options data
        let myquery2 = ""; // Initialize query for options insert
        let optionList = questionsList[0]["options"]; // Initialize list of options of a question 
        for(let i=0; i<questionsList.length; i++){ // For all questions
            optionList = questionsList[i]["options"]; // Update option list for current question
                myquery2 = "insert into `options` values "; // Reset query string for options insert
                for(let j=0; j<optionList.length; j++){ // Add every option tuple of a question in the query string
                    if(optionList[j]["nextqID"] != "-"){
                        myquery2 += "(" + "'" + optionList[j]["optID"] + "'," + "'" + optionList[j]["opttxt"] + "'," + "'" + optionList[j]["nextqID"] + "'," + "'" + questionsList[i]["qID"] + "'," + "'" + questionnaireID + "')"; 
                    }
                    else{ // If nextqID = '-', that is there is not next question, insert the value null in the corresponding database column
                        myquery2 += "(" + "'" + optionList[j]["optID"] + "'," + "'" + optionList[j]["opttxt"] + "'," + "null," + "'" + questionsList[i]["qID"] + "'," + "'" + questionnaireID + "')"; 
                    }
                    if (j < optionList.length-1){ // If we have more options left to add
                        myquery2 += ","
                    }
                    else{
                        myquery2 += ";"
                    }
                }
                connection.query(myquery2, function (err, result, fields) {
                    if (err) throw err;
                });
            }
        res.status(200).send({"status":"Success"});    
        connection.release();
        console.log("Disconnected from db");
    });
}

router.post('/admin/questionnaire_upd',questionnaire_update)
module.exports = router;