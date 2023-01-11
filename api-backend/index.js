const express = require('express')
const app = express();
const port = 9103;
var path = require('path');



//initialize port for node application to run
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});





app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});


// load all endpoints
const healthcheck=require("./admin/healtcheck.js");
const questionnaire_upd=require("./admin/questionnaire_upd.js");
const resetall=require("./admin/resetall");
const resetq=require("./admin/resetq");
//const dataByName=require("./admin/dataByName");

const questionnaire=require("./questionnaire.js");
const question=require("./question.js");
const doanswer=require("./doanswer.js");
const getsessionanswers=require("./getsessionanswers.js");


//bind all endpoints to app router
app.use('/',healthcheck);
app.use('/',questionnaire_upd);
app.use('/',resetall);
app.use('/',resetq);
//app.use('/',dataByName);

app.use('/',questionnaire);
app.use('/',question);
app.use('/',doanswer);
app.use('/',getsessionanswers);