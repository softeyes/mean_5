var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:21100/users',{useMongoClient:true});

var schema = {
    name: String,
    email: String,
    gender: String,
    job: String,
    favorite_colors: String,
    avatar: String
}

var document = new mongoose.Schema(schema);

var USERCLASS = mongoose.model('employees', document);

module.exports = USERCLASS;