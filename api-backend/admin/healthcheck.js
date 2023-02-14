/*{baseURL}/admin/healthcheck
Admin endpoint to check connectivity to database
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

function healthcheckRequest(req,res){

    const pool = require(path.resolve("db_connection/getPool.js"));
    pool.getConnection(function(err,connection) {
        try{
            if (err) throw err;
            console.log("Connected to db");
            if(req.query.format == "csv"){
                res.status(200).send([["status"],["OK"]]);
            }
            else if(!req.query.format || req.query.format == "json"){
                res.status(200).send({"status":"OK"});
            }
            else{
                res.status(400).send({"name":"FormatQueryParamError","message":"Not valid \"format\" parameter. Try \"json\", \"csv\" or nothing."});
            }
            
            connection.release();
            console.log("Disconnected from db");
        }
        catch(err){
            res.status(500).send({"status":"failed"});    
        }     
    });
    
}

router.get('/admin/healthcheck',healthcheckRequest)
module.exports = router; 