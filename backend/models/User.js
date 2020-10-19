const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the database
const UserSchema = new Schema({
    username: String,
    email: String,
    password: String
})

// create a user model
var UserModel = mongoose.model('users', UserSchema);

//export model
module.exports = UserModel;