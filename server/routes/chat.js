require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.set('strictQuery', true);
var passport = require('passport');
var Public = require('../schemas/publicSchema.js')
var Chats = require('../schemas/chatSchema.js')

require('../passport/passport.js') (passport)

// checking if the users have liked each other
router.post('/check', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    var name = req.body.name

    Public.findOne({id: req.user._id}, (err, user) => {
        Public.findOne({name: name}, (err, person) => {
            var liked = person.liked
            if (liked.indexOf(user.name) > -1) {
                //saving the new chat to database

                const chat = new Chats({
                    name1: user.name,
                    name2: person.name,
                    chat: undefined
                })
                chat.save()
            }
        })
    })
    
    res.sendStatus(200)
})

//finding the right chat between two users and sidebar names
router.get('/matched/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    var id = req.user._id
    var toName = req.params.id
    
        Public.findOne({id: id}, (err, person) => {
            Chats.find({$or: [{name1: person.name}, {name2: person.name}]}, (err, chats) => {
                //finding chat that has the person as one of the chats
                var id = 0
                var list = []
                chats.forEach(el => {
                    //for sidebar saving the users
                    if (el.name1 === person.name) {
                        list.push([id, el.name2])
                    }
                    else {
                        list.push([id, el.name1])
                    }
                    id = id+1
                });

                if(toName === "main") {
                    res.send(JSON.stringify(list))
                }
                else {
                    //finding the right chat between two users and returning it
                    chats.forEach(el => {
                        if (el.name1 === toName || el.name2 == toName) {                        
                            res.send(JSON.stringify([el.chat, list]))
                        }
                    })
                }
                
            })
        })

})

//adding the new chat to file
router.post('/add', passport.authenticate('jwt', {session: false}), (req,res) => {
    var id = req.user._id
    var toName = req.body.name
    var msg = req.body.msg

    Public.findOne({id: id}, (err, person) => {
        Chats.findOneAndUpdate({
            $or: [{name1: person.name, name2: toName}, {name1: toName, name2: person.name}]},
            {$push: {chat: [person.name, msg]}},
            (err, chat) => {
            res.sendStatus(200)
        })
    });
})
    

module.exports = router;