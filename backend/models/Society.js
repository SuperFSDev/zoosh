const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create database schema
const SocietySchema = new Schema({
    name: String,
    college: String,
    category: String,
    address: String,
    description: String,
    private: Boolean,
    users: {type: Array, "default" : []},
    events: {type: Array, "default" : []}
})

// create a model
var SocietyModel = mongoose.model('societies', SocietySchema);

// export model
module.exports = SocietyModel;