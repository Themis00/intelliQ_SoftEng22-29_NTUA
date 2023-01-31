/*{baseURL}/getsessionanswers/:questionnaireID/:session

In this endpoint, we get an object that includes all the answers to the
questions of a specific questionnaire given in a specific session 
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

function getSessionAnswersRequest(req,res){

    const pool = require(path.resolve("db_connection/getPool.js"));
    pool.getConnection(function(err,connection) {
        if (err) throw err;
        console.log("Connected to db");
        let myquery= "select questionnaireID from `questionnaire` where questionnaireID =" + "'" + req.params.questionnaireID+"';"+
            "select session from `participant` where session =" + "'" + req.params.session+"';"+
            "select qID, ans, ans_str from `answers` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and session =" + "'" + req.params.session+"'"+ "and ans is not null order by qID";
        connection.query(myquery, function (err, result, fields) {
            if (err) throw err;
            //------------------ Modify JSON in order to have the wanted syntax -----------------------
            let temp1 = JSON.stringify(result[0][0]).slice(0,-1);
            let temp2 = JSON.stringify(result[1][0]).slice(0,-1).slice(1);
            for(let i=0; i<result[2].length; i++){ // Delete empty answer strings from multiple choice question answers
                if(result[2][i]["ans_str"] == null){
                    delete result[2][i].ans_str;
                }
                else{
                    delete result[2][i].ans; // If the answer has an answer string, the option selected (ans) is the only option and can be omitted
                }
            }
            let temp3 = JSON.stringify(result[2]);
            let json_str = temp1 + "," + temp2 + ",\"answers\":" + temp3 + "}";
            //-----------------------------------------------------------------------------------------
            res.status(200).send(JSON.parse(json_str));
        });
        connection.release();
        console.log("Disconnected from db");
    });

}

router.get('/getsessionanswers/:questionnaireID/:session',getSessionAnswersRequest)
module.exports = router; 