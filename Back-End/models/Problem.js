const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating problem schema
const ProblemSchema = new Schema({
    problem_type: Number,
    title: String,
    content: String
})

// create a model
var ProblemModel = mongoose.model('problems', ProblemSchema);

// export model
module.exports = ProblemModel;