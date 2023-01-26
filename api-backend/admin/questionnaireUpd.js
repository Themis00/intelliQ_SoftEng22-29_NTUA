/*{baseURL}/admin/questionnaire_upd 
*/

const express = require('express');
const router = express.Router();
var mariadb = require('mariadb/callback');
var path = require('path');

function questionnaire_update(req,res){
    res.send(req.body.questions[0]["qID"]);
}

router.post('/admin/questionnaire_upd',questionnaire_update)
module.exports = router;