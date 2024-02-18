var mongoose = require('mongoose');

const publicSchema = new mongoose.Schema({
  id: {type: Object},
  name: {type: String},
  info: {type: String},
  neutral: {type: Array},
  liked: {type: Array},
  dislike: {type: Array}
});

module.exports =  mongoose.model('Public', publicSchema)
