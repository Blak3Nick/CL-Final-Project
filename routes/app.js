var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/node', function(req, res, next) {
    res.render('node');
});

module.exports = router;
