const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the database
const UserSchema = new Schema({
    fullname: String,
    email: String,
    password: String,
    college: String,
    course: String,
    dob: String,
    bio: String,
    pic: { data: Buffer, contentType: String },
    societies: {type: Array, "default" : []},
    posts: {type: Array, "default" : []},
    followers: {type: Array, "default" : []},
    following: {type: Array, "default" : []}
})


// create a user model
var UserModel = mongoose.model('users', UserSchema);


//export model
module.exports = UserModel;
