/*{baseURL}/questionnaire/:questionnaireID

In this endpoint, we get an object that includes the questionnaireTitle,
and the questions of the questionnaire with all their attributes
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

function getQuestionnaireRequest(req,res){
    
    const pool = require(path.resolve("db_connection/getPool.js"));
    pool.getConnection(function(err,connection) {
        if (err) throw err;
        console.log("Connected to db");
        let myquery= "select questionnaireID,questionnaireTitle from `questionnaire` where questionnaireID =" + "'" + req.params.questionnaireID+"';"+
            "select keyword from keywords where questionnaireID =" + "'" + req.params.questionnaireID+"';"+ 
            "select qID, qtext, required, type from questions where questionnaireID = " + "'" + req.params.questionnaireID+"' order by qID";
        connection.query(myquery, function (err, result, fields) {
            if (err) throw err;
            res.status(200).send(result);
        });
        connection.release();
        console.log("Disconnected from db");
    });

}

router.get('/questionnaire/:questionnaireID',getQuestionnaireRequest)
module.exports = router; 