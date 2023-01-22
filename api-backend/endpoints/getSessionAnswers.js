/*{baseURL}/getsessionanswers/:questionnaireID/:session

In this endpoint, we get an object that includes all the answers to the
questions of a specific questionnaire given in a specific session 
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');

function getSessionAnswers(req,res){

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
            "select session from `participant` where session =" + "'" + req.params.session+"';"+
            "select qID, ans, ans_str from `answers` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and session =" + "'" + req.params.session+"'"+ "order by qID";
        con.query(myquery, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });

}

router.get('/getsessionanswers/:questionnaireID/:session',getSessionAnswers)
module.exports = router; 