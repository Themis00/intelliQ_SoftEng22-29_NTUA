const express = require('express');
var mariadb = require('mariadb/callback');

var pool  = mariadb.createPool({
  connectionLimit : 15,
  host: "localhost",
  user: "root",
  password: "",
  database: "intelliq",
  multipleStatements: true
});

console.log("Pool created");

module.exports = pool;