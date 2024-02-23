var express = require('express');
var router = express.Router();
var Public = require('../schemas/publicSchema.js');
var User = require('../schemas/userSchema.js');
var Chats = require('../schemas/chatSchema.js');
var passport = require('passport');

require('../passport/passport.js') (passport)



module.exports = router;