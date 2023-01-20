const express = require('express')
const app = express();
const port = 9103;
//const bodyparser = require('body-parser');
var path = require('path');

//middlewares
//app.use(bodyParser.json());

//initialize port for node application to run
app.listen(port, () => {
  console.log(`inteliQ listening on port ${port}!`);
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});


