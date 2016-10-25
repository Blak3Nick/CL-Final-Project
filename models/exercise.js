var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var User = require('../models/user');
var schema = new Schema({
    exName: {type: String, required: true},
    sets: {type: Number},
    reps: {type: Number},
    weight: {type: Number},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
    });
schema.post('remove', function (doc) {
    var deletedExercise = doc;
    User.findById(doc.user, function (err, doc) {
        doc.exercises.pull(deletedExercise);
        doc.save();
    });
});
module.exports = mongoose.model('Exercise', schema);