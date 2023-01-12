const express = require('express');
const router = express.Router();
var mariadb = require('mariadb');

router.get('/healthcheck', (req, res) => {

  database.ping((err) => {
        if(err) return res.status(500).send(" {"status":"failed", "dbconnection":[MariaDB Server is Down]}");
          
        res.send(" {"status":"OK", "dbconnection":[MariaDB Server is Active]}");
});

module.exports = router; 