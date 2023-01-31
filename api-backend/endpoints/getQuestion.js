/*. {baseURL}/question/:questionnaireID/:questionID

In this endpoint, we get an object that includes the question info and
options of a specific question of a specific questionnaire
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

async function getQuestionRequest(req,res){

    const pool = require(path.resolve("db_connection/getPool.js"));

    await new Promise(() => pool.getConnection(async function(err,connection) {
        
        if (err) throw err;
        console.log("Connected to db");

        let myquery= "select questionnaireID, qID, qtext, required, type from `questions` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"';"+
            "select optID, opttxt, nextqID from `options` where questionnaireID =" + "'" + req.params.questionnaireID+"'"+ "and qID =" + "'" + req.params.questionID+"'"+ "order by optID";

        await new Promise(() => connection.query(myquery, function (err, result, fields) {
            if (err) throw err;
            //------------------ Modify JSON in order to have the wanted syntax -----------------------
            let temp1 = JSON.stringify(result[0][0]).slice(0,-1);
            let temp2 = JSON.stringify(result[1]);
            let json_str = temp1 + ",\"options\":" + temp2 + "}";
            //-----------------------------------------------------------------------------------------
            res.status(200).send(JSON.parse(json_str));
        }));

        connection.release();
        console.log("Disconnected from db");

    }));

}

router.get('/question/:questionnaireID/:questionID',getQuestionRequest)
module.exports = router; 
