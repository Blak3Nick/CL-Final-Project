var mongoose = require('mongoose');
//Using Mongoose Schemas define what a user is for the backend
var Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    exercises: [{type: Schema.Types.ObjectId, ref: 'Exercise'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);