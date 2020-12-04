const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the database
const CommentSchema = new Schema({
    user:String,
    user_id:String,
    post_id:String,
    comment:String,
    time:Date,
})


// create a post model
var CommentModel = mongoose.model('comments', CommentSchema);


//export model
module.exports = CommentModel;
