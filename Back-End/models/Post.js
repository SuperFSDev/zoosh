const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the database
const PostSchema = new Schema({
    user:String,
    title:String,
    claps:Number,
    post:String,
    time:Date,
    category:String,
    tags:Array,
    pics: [{ data: Buffer, contentType: String }]
})


// create a post model
var PostModel = mongoose.model('posts', PostSchema);


//export model
module.exports = PostModel;
