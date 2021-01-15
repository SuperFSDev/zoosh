const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the database
const UserSchema = new Schema({
    fullname: String,
    username: String,
    email: String,
    password: String,
    college: String,
    course: String,
    dob: String,
    bio: String,
    time:Date,
    pic: { data: Buffer, contentType: String },
    score:{type:Number , "default":0},
    societies: {type: Array, "default" : []},
    posts: {type: Array, "default" : []},
    forumPosts:{type: Array, "default" : []},
    questions:{type: Array, "default" : []},
    forums:{type: Array, "default" : []},
    followers:{type: Array, "default" : []},
    following:{type: Array, "default" : []},
    forums:{type: Array, "default" : []},
    badges:{type: Array, "default" : []},
    podcasts:{type: Array, "default" : []},
    readingList:{type: Array, "default" : []},

})


// create a user model
var UserModel = mongoose.model('users', UserSchema);


//export model
module.exports = UserModel;
