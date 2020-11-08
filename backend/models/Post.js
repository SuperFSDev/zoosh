const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the database
const PostSchema = new Schema({
    user:String,
    post:String,
    time:Date,
    category:String
})


// create a post model
var PostModel = mongoose.model('posts', PostSchema);


//export model
module.exports = PostModel;
