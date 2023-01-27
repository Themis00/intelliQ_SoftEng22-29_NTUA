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

        // Insert questions and options data
        let questionsList = req.body.questions;
        let myquery2 = ""; // Initialize query for options insert
        let optionList = questionsList[0]["options"]; // Initialize list of options of a question 
        for(let i=0; i<questionsList.length; i++){
            myquery = "insert into `questions` values (" + "'" + questionsList[i]["qID"] + "'," + "'" + questionsList[i]["qtext"] + "'," + "'" + questionsList[i]["required"] + "'," + "'" + questionsList[i]["type"] + "'," + "'" + questionnaireID + "');";
            connection.query(myquery, function (err, result, fields) {
                if (err) throw err;
            });
            optionList = questionsList[i]["options"]; // Update option list for current question
            myquery2 = "insert into `options` values "; // Reset query string for options insert
            for(let j=0; j<optionList.length; j++){
                myquery2 += "(" + "'" + optionList[j]["optID"] + "'," + "'" + optionList[j]["opttxt"] + "'," + "'" + optionList[j]["nextqID"] + "'," + "'" + questionsList[i]["qID"] + "'," + "'" + questionnaireID + "')"; // Add every option tuple of a question in the query string
                if (j < optionList.length-1){
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
        
        connection.release();
    });
    /*let questionsList = req.body.questions;
    let optionList = questionsList[1]["options"];
    res.send(optionList[0]["optID"]);*/
}

router.post('/admin/questionnaire_upd',questionnaire_update)
module.exports = router;