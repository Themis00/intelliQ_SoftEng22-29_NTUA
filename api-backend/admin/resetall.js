/*{baseURL}/admin/resetall
Admin endpoint to erase all data from database
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

function resetAllRequest(req,res){

    const pool = require(path.resolve("db_connection/getPool.js"));
    pool.getConnection(function(err,connection) {
        if (err) throw err;
        console.log("Connected to db");
        let myquery= "delete from questionnaire; delete from participant;"; // Due to foreign key constraints, if we delete questionnaire and participant inserts all other inserts get deleted as well.
        connection.query(myquery, function (err, result, fields) {
            if (err) throw err;
            res.status(200).send({"status":"OK"});
        });
        connection.release();
        console.log("Disconnected from db");
    });

}

router.post('/admin/resetall',resetAllRequest)
module.exports = router; 