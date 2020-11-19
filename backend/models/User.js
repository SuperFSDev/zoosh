const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.schema.Types;

// create schema for the database
const UserSchema = new Schema({
    fullname: String,
    email: String,
    password: String,
    college: String,
    course: String,
    dob: String,
    bio: String,
    time:Date,
    pic: { data: Buffer, contentType: String },
    societies: {type: Array, "default" : []},
    posts: {type: Array, "default" : []},
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})


// create a user model
var UserModel = mongoose.model('users', UserSchema);


//export model
module.exports = UserModel;
