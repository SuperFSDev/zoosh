const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the database
const PodcastSchema = new Schema({
    user:String,
    name:String,
    link:String,
    title:String,
    time:Date,
    description:String,
})


// create a post model
var PodcastModel = mongoose.model('podcasts', PodcastSchema);


//export model
module.exports = PodcastModel;
