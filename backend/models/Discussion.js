const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the database
const DiscussionSchema = new Schema({
    user:String,
    title:String,
    post:String,
    time:Date,
    category:Array,
    tags:Array
})


// create a post model
var DiscussionModel = mongoose.model('discussions', DiscussionSchema);


//export model
module.exports = DiscussionModel;
