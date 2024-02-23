var express = require('express');
var router = express.Router();
var Public = require('../schemas/publicSchema.js');
var User = require('../schemas/userSchema.js');
var Chats = require('../schemas/chatSchema.js');
var passport = require('passport');

require('../passport/passport.js') (passport)

router.put('/info/:name', passport.authenticate('jwt', {session: false}), (req,res) => {
    var name = req.params.name;

    Public.findOneAndUpdate({name:name}, {$unset: {info: ""}},(err, result) => {})
    res.sendStatus(200)
})

module.exports = router;