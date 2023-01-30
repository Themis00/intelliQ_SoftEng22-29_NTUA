/*{baseURL}/getquestionanswers/:questionnaireID/:questionID

In this endpoint, we get an object that includes all the answers (for 
all sessions) in a specific question of a specific questionnaire. 
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

function getQuestionAnswers(req,res){

    const pool = require(path.resolve("db_connection/getPool.js"));
    pool.getConnection(function(err,connection) {
        if (err) throw err;
        console.log("Connected to db");
        let myquery= "select questionnaireID from `questionnaire` where questionnaireID =" + "'" + req.params.questionnaireID+"';"+
            "select qID from `questions` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"';"+ 
            "select session, ans_str from `answers` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"'"+ "and ans like '%TXT' order by ans_datetime desc;" +
            "select session, ans from `answers` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"'"+ "and ans not like '%TXT' and ans is not null order by ans_datetime desc";
        connection.query(myquery, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
        connection.release();
    });

}

router.get('/getquestionanswers/:questionnaireID/:questionID',getQuestionAnswers)
module.exports = router; 