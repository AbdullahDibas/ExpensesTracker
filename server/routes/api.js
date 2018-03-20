const express = require('express');
const router = express.Router();

// for any incoming requrests we are going to send back "api works".
router.get('/', function(req, res){
    res.send('api works');
});


module.exports = router;