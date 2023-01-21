/*. {baseURL}/question/:questionnaireID/:questionID

In this endpoint, we get an object that includes the question info and
options of a specific question of a specific questionnaire
*/

const express = require('express');
const router = express.Router();
var mysql = require('mysql');

function getQuestion(req,res){

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "intelliq",
        multipleStatements: true
      });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to db");
        let myquery= "select questionnaireID, qID, qtext, required, type from `questions` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"';"+
            "select optID, opttxt, nextqID from `options` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"'"+ "order by optID";
        con.query(myquery, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });

}

router.get('/question/:questionnaireID/:questionID',getQuestion)
module.exports = router; 
