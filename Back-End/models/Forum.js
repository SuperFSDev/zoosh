const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create database schema
const ForumSchema = new Schema({
    user:String,
    user_id:String,
    post:String,
    time:Date,
    tag:String,
})

// create a model
var ForumModel = mongoose.model('forums', ForumSchema);

// export model
module.exports = ForumModel;
