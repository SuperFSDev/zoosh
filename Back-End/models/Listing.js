const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the database
const ListingSchema = new Schema({
    user:String,
    user_id:String,
    subject:String,
    description:String,
    rate:Number,
    time:Date,
})


// create a post model
var ListingModel = mongoose.model('listings', ListingSchema);


//export model
module.exports = ListingModel;
