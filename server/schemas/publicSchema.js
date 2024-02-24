var mongoose = require('mongoose');

const publicSchema = new mongoose.Schema({
  id: {type: Object},
  name: {type: String},
  info: {type: String},
  date: {type: Date},
  photo: {type: Buffer},
  update:{type: Boolean, default: true}, 
  neutral: {type: Array},
  liked: {type: Array},
  dislike: {type: Array}
});

module.exports =  mongoose.model('Public', publicSchema)
