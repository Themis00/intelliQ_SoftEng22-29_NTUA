const express = require('express');
const router = express.Router();
var mariadb = require('mariadb');

router.post('/questionnaire_upd',(req,res) => {

	console.log("Connected!");
	res.send(req.body);
	
});



router.post('/questionnaire_upd',questionnaire_upd)
module.exports = router; 