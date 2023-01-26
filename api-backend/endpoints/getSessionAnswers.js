/*{baseURL}/getsessionanswers/:questionnaireID/:session

In this endpoint, we get an object that includes all the answers to the
questions of a specific questionnaire given in a specific session 
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

function getSessionAnswers(req,res){

    const pool = require(path.resolve("db_connection/getPool.js"));
    pool.getConnection(function(err,connection) {
        if (err) throw err;
        console.log("Connected to db");
        let myquery= "select questionnaireID from `questionnaire` where questionnaireID =" + "'" + req.params.questionnaireID+"';"+
            "select session from `participant` where session =" + "'" + req.params.session+"';"+
            "select qID, ans, ans_str from `answers` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and session =" + "'" + req.params.session+"'"+ "order by qID";
        connection.query(myquery, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
        connection.release();
    });

}

router.get('/getsessionanswers/:questionnaireID/:session',getSessionAnswers)
module.exports = router; 