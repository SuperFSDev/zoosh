const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the database
const TutorSchema = new Schema({
    user:String,
    subject:String,
    description:String,
    rate:Number,
})


// create a post model
var TutorModel = mongoose.model('tutors', TutorSchema);


//export model
module.exports = TutorModel;
