const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the database
const DiscussionSchema = new Schema({
    user:String,
    title:String,
    content:String,
    time:Date,
    society:String,
    hearts:Number,
    comments:Array,
})


// create a post model
var DiscussionModel = mongoose.model('discussions', DiscussionSchema);


//export model
module.exports = DiscussionModel;
