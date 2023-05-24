var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String,
    firstname: String,
    lastname: String,
    address: String,
    DOB: String
});

module.exports =  mongoose.model('User', UserSchema)