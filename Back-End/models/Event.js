const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the database
const EventSchema = new Schema({
    user:String,
    title:String,
    time:Date,
    society:String,
    description:String,
})


// create a post model
var EventModel = mongoose.model('events', EventSchema);


//export model
module.exports = EventModel;
