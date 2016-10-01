var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/:userTitle?', function(req, res, next) {
    var email = '';
    User.findOne({}, function(err, doc){
        if(err) {
         return res.send('Error');
        }
        if (doc) {
            email = doc.email;
        }
        res.render('node', {email: email});
    });

});

router.post('/', function(req, res, next) {
    var email = req.body.email;
    var user = new User({
        firstName: 'Blake',
        lastName: 'Nicholson',
        password: 'super',
        email: email
    });
    user.save();
    res.redirect('/');
});
module.exports = router;
