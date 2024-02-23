var mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    name1: {type: String},
    name2: {type: String},
    chat: {type: Array}
})
  
module.exports =  mongoose.model('Chats', chatSchema)