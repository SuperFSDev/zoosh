const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the database
const DiscussionSchema = new Schema({
    user:String,
    user_id:String,
    title:String,
    caption:String,
    content:String,
    time:Date,
    society:String,
    claps:Number,
    comments:Array,
    picture: String
})


// create a post model
var DiscussionModel = mongoose.model('discussions', DiscussionSchema);


//export model
module.exports = DiscussionModel;
