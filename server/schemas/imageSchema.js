var mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    id: {type: Object},
    photo: {type: Buffer}
})

module.exports =  mongoose.model('Images', imageSchema)
