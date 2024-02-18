var mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    email: {type: String},
    password: {type: String},
  });

module.exports =  mongoose.model('User', usersSchema)