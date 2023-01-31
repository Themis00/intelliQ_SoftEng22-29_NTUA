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
            //------------------ Modify JSON in order to have the wanted syntax -----------------------
            let temp1 = JSON.stringify(result[0][0]).slice(0,-1)
            let temp2 = ",\"keywords\":[";
            for(let i=0; i<result[1].length; i++){ // Add each keyword
                temp2 += "\"" + result[1][i]["keyword"] + "\"";
                if (i < result[1].length-1){ // If we have more keywords left to add
                    temp2 += ","
                }
                else{
                    temp2 += "]"
                }
            }
            let temp3 = JSON.stringify(result[2]);
            let json_str = temp1+ temp2 + ",\"questions\":" + temp3 + "}";
            //-----------------------------------------------------------------------------------------
            res.status(200).send(JSON.parse(json_str));
        });
        connection.release();
        console.log("Disconnected from db");
    });

}

router.get('/questionnaire/:questionnaireID',getQuestionnaireRequest)
module.exports = router; 