/*{baseURL}/doanswer/:questionnaireID/:questionID/:session/:optionID

In this endpoint, we insert an answer to the database
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

function insertanswer(req,res){

    const pool = require(path.resolve("db_connection/getPool.js"));
    pool.getConnection(function(err,connection) {
        if (err) throw err;
        console.log("Connected to db");
        let myquery = ""; // Initialize the query 
        if(req.params.optionID.includes("TXT")){ // If the option includes open string as answer insert the answer as well
            myquery += "insert into `answers` values ("+"'"+req.params.optionID+"'"+","+"'"+req.params.questionnaireID+"'"+","+"'"+req.params.session+"'"+","+"'"+req.params.questionID+"'"+",current_timestamp(),"+"'"+req.body.ans_str+"'"+");";
        }
        else{
            myquery += "insert into `answers` values ("+"'"+req.params.optionID+"'"+","+"'"+req.params.questionnaireID+"'"+","+"'"+req.params.session+"'"+","+"'"+req.params.questionID+"'"+",current_timestamp(),null);";
        }
        connection.query(myquery, function (err, result, fields) {
            if (err) throw err;
            res.status(200);
        });
        connection.release();
        console.log("Disconnected from db");
    });

}

router.post('/doanswer/:questionnaireID/:questionID/:session/:optionID',insertanswer)
module.exports = router; 