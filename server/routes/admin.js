var express = require('express');
var router = express.Router();
var Public = require('../schemas/publicSchema.js');
var User = require('../schemas/userSchema.js');
var Chats = require('../schemas/chatSchema.js');
var passport = require('passport');

require('../passport/passport.js') (passport)

//handles the deletion of Info
router.put('/info/:name', passport.authenticate('jwt', {session: false}), (req,res) => {
    var name = req.params.name;

    Public.findOneAndUpdate({name:name}, {$unset: {info: ""}},(err, result) => {})
    res.sendStatus(200)
})

//handles the deletion of user and other that are lnked to it
router.delete('/user/:name', passport.authenticate('jwt', {session: false}), (req,res) => {
    var name = req.params.name
    Public.findOne({name: name}, (err, exist) => {
        if(exist) {
            Public.findOne({name: name}, (err, user) => {
                User.findOneAndDelete({_id: user.id}, (err,result) => {})
            })
            Public.deleteOne({name: name}, (err, user) => {})
            Chats.deleteMany({$or: [{name1: name}, {name2: name}]}, (err, chats) => {})
            Public.updateMany({}, {$pull: {neutral:name}}).exec()
            Public.updateMany({}, {$pull: {liked:name}}).exec()
            Public.updateMany({}, {$pull: {dislike:name}}).exec()
            res.sendStatus(200)
        }
        
    })
})

module.exports = router;