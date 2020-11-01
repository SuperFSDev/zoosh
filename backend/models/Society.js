const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create database schema
const SocietySchema = new Schema({
    name: String,
    college: String,
    category: String,
    address: Address,
    private: boolean
})

// create a model
var SocietyModel = mongoose.model('societies', SocietySchema);

// export model
module.exports = SocietyModel;