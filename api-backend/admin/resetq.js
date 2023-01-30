/*{baseURL}/admin/resetq/:questionnaireID
Admin endpoint to delete all answers given in a specific questionnaire
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

function resetqRequest(req,res){

    const pool = require(path.resolve("db_connection/getPool.js"));
    pool.getConnection(function(err,connection) {
        if (err) throw err;
        console.log("Connected to db");
        let myquery= "delete from `answers` where questionnaireID =" + "'" + req.params.questionnaireID + "';";
        connection.query(myquery, function (err, result, fields) {
            if (err) throw err;
            res.status(200).send({"status":"OK"});
        });
        connection.release();
        console.log("Disconnected from db");
    });

}

router.post('/admin/resetq/:questionnaireID',resetqRequest)
module.exports = router; 