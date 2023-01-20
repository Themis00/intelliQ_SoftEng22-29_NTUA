/*{baseURL}/questionnaire/:questionnaireID

In this endpoint, we get an object that includes the questionnaireTitle,
and the questions of the questionnaire with all their attributes
*/

const express = require('express');
const router = express.Router();
var mysql = require('mysql');

function getQuestionnaire(req,res){

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "intelliq",
        multipleStatements: true
      });

    con.connect(function(err) {
        if (err) throw err;
        let myquery= "select questionnaireTitle from `questionnaire` where questionnaireID = req.params.questionnaireID;\
                        select keyword from `keywords` where questionnaireID = req.params.questionnaireID;\
                        select qID, qtext, required, type from `questions` where questionnaireID = req.params.questionnaireID order by qID;";
        con.query(myquery, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });

}

router.get('/questionnaire/:questionnaireID',getQuestionnaire)
module.exports = router; 