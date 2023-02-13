const express = require('express')
const app = express();
const port = 9103;
var path = require('path');
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

/*
process.on('uncaughtException', function (err) {
  console.log("Error with code:" + err.code);
  if(err.code == 'ECONNREFUSED'){
    console.log("Unable to connect to database!");
  }
});
*/

//initialize port for node application to run
app.listen(port, () => {
  console.log(`inteliQ listening on port ${port}!`);
});


app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname + '/index.html'));
});

// Admin Endpoints
const healthcheck = require("./admin/healthcheck.js");
const questionnaireUpd = require("./admin/questionnaireUpd.js");
const resetall = require("./admin/resetall.js");
const resetq = require("./admin/resetq.js");

app.use('/intelliq_api',healthcheck);
app.use('/intelliq_api',questionnaireUpd);
app.use('/intelliq_api',resetall);
app.use('/intelliq_api',resetq);

// System Function
const getQuestionnaire = require("./endpoints/getQuestionnaire.js");
const getQuestion = require("./endpoints/getQuestion.js");
const doanswer = require("./endpoints/doanswer.js");
const getSessionAnswers = require("./endpoints/getSessionAnswers.js");
const getQuestionAnswers = require("./endpoints/getQuestionAnswers.js");

app.use('/intelliq_api',getQuestionnaire);
app.use('/intelliq_api',getQuestion);
app.use('/intelliq_api',doanswer);
app.use('/intelliq_api',getSessionAnswers);
app.use('/intelliq_api',getQuestionAnswers);