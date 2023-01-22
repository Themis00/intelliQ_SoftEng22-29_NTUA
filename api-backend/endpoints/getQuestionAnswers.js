/*{baseURL}/getquestionanswers/:questionnaireID/:questionID

In this endpoint, we get an object that includes all the answers (for 
all sessions) in a specific question of a specific questionnaire. 
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');

function getQuestionAnswers(req,res){

    var con = mariadb.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "intelliq",
        multipleStatements: true
      });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to db");
        let myquery= "select questionnaireID from `questionnaire` where questionnaireID =" + "'" + req.params.questionnaireID+"';"+
            "select qID from `questions` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"';"+ 
            "select session, ans_str from `answers` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"'"+ "and ans like '%TXT' order by ans_datetime desc;" +
            "select session, ans from `answers` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"'"+ "and ans not like '%TXT' order by ans_datetime desc";
        con.query(myquery, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });

}

router.get('/getquestionanswers/:questionnaireID/:questionID',getQuestionAnswers)
module.exports = router; 