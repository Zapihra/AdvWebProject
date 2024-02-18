require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.set('strictQuery', true);
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var Public = require('../schemas/publicSchema.js')
var User = require('../schemas/userSchema.js');

const chatChema = new mongoose.Schema({
    name1: {type: String},
    name2: {type: String},
    chat: {type: Array}
})
  
const Chats = mongoose.model('Chats', chatChema)
  
var opts = {
    secretOrKey: process.env.SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}
  
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({email: jwt_payload.email}, function(err, user){
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      }
      else {return done(null, false);}
    })
}));

router.post('/check', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    var name = req.body.name

    Public.findOne({id: req.user._id}, (err, user) => {
        Public.findOne({name: name}, (err, person) => {
            
            var liked = person.liked
            if (liked.indexOf(user.name) > -1) {
                const chat = new Chats({
                    name1: user.name,
                    name2: person.name,
                    chat: []
                })
                chat.save()
            }
        })
    })
    
    res.sendStatus(200)
})

router.get('/matched', passport.authenticate('jwt', {session: false}), (req, res) => {
    var id = req.user._id

    Public.findOne({id: id}, (err, person) => {
        Chats.find({$or: [{name1: person.name}, {name2: person.name}]}, (err, chats) => {
            var id = 0
            var list = []
            chats.forEach(el => {
                if (el.name1 === person.name) {
                    list.push([id, el.name2])
                }
                else {
                    list.push([id, el.name1])
                }
                id = id+1
            });
            res.send(JSON.stringify(list))
        })
    })
})
module.exports = router;