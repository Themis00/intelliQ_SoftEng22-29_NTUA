/*{baseURL}/getquestionanswers/:questionnaireID/:questionID

In this endpoint, we get an object that includes all the answers (for 
all sessions) in a specific question of a specific questionnaire. 
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

function getQuestionAnswersRequest(req,res){

    const pool = require(path.resolve("db_connection/getPool.js"));
    pool.getConnection(function(err,connection) {
        if (err) throw err;
        console.log("Connected to db");
        let myquery= "select questionnaireID, qID from `questions` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"';"+ 
            "select session, ans_str from `answers` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"'"+ "and ans like '%TXT' order by ans_datetime desc;" +
            "select session, ans from `answers` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"'"+ "and ans not like '%TXT' and ans is not null order by ans_datetime desc";
        connection.query(myquery, function (err, result, fields) {
            if (err) throw err;
            //------------------ Modify JSON in order to have the wanted syntax -----------------------
            let temp1 = JSON.stringify(result[0][0]).slice(0,-1)
            let temp2 = "";
            if(result[1].length != 0){
                temp2 = JSON.stringify(result[1])
            }
            else{
                temp2 = JSON.stringify(result[2])
            }
            let json_str = temp1 + ",\"answers\":" + temp2 + "}";
            //-----------------------------------------------------------------------------------------
            res.status(200).send(JSON.parse(json_str));
        });
        connection.release();
        console.log("Disconnected from db");
    });

}

router.get('/getquestionanswers/:questionnaireID/:questionID',getQuestionAnswersRequest)
module.exports = router; 