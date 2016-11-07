var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Exercise = require('../models/exercise');
var User = require('../models/user');

router.get('/', function(req, res, next) {
    Exercise.find()
        .populate('user', 'firstName')
        .exec(function(err, docs){
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: docs
            });
        });
});

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(404).json({
                title: 'Authentication Failed',
                error: err
            });
        }
        next();
    });
});

router.post('/', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        var exercise = new Exercise({
            exName: req.body.exName,
            sets: req.body.sets,
            date: req.body.date,
            reps: req.body.reps,
            weight: req.body.weight,
            user: doc
        });
        exercise.save(function(err, result){
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            doc.exercises.push(result);
            doc.save();
            res.status(201).json({
                message: 'Saved exercise',
                obj: result
            });
        });
    });
});
router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Exercise.findById(req.params.id, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'AN ERROR OCCURED',
                error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                title: 'No document found',
                error: {message: 'Exercise could not be found'}

            });
        }
        if (doc.user != decoded.user._id){
            return res.status(401).json({
                title: 'Not authorized',
                error: {message: 'Exercise could not be created'}

            });
        }
        doc.exName = req.body.exName;
        doc.sets = req.body.sets;
        doc.date = req.body.date;
        doc.reps = req.body.reps;
        doc.weight = req.body.weight;
        doc.save(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'AN ERROR OCCURED',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: result
            });
        });
    });
});
router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Exercise.findById(req.params.id, function (err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'AN ERROR OCCURED',
                error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                title: 'No document found',
                error: {message: 'Exercise could not be found'}

            });
        }
        if (doc.user != decoded.user._id){
            return res.status(401).json({
                title: 'Not authorized',
                error: {message: 'Could not be deleted'}
            });
        }

        doc.remove(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'AN ERROR OCCURED',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: result
            });
        });
    });
});
module.exports = router;