const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the database
const QuestionSchema = new Schema({
    user:String,
    user_id:String,
    question:String,
    time:Date,
    society:String,
    claps:Number,
    comments:Array,
})


// create a post model
var QuestionModel = mongoose.model('questions', QuestionSchema);


//export model
module.exports = QuestionModel;
