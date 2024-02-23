var mongoose = require('mongoose');

const publicSchema = new mongoose.Schema({
  id: {type: Object},
  name: {type: String},
  info: {type: String},
  picture: {type: String, required: false},
  update:{type: Boolean, default: true}, 
  neutral: {type: Array},
  liked: {type: Array},
  dislike: {type: Array}
});

module.exports =  mongoose.model('Public', publicSchema)
