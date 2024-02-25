require('dotenv').config();
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.set('strictQuery', true)
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var passport = require('passport');
require('../passport/passport.js') (passport)
const fs = require('fs')


const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb)=> {
    //help at https://stackoverflow.com/questions/54113654/creating-a-random-string-in-cypress-and-passing-this-to-a-cy-command
    var random = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 10; i++)
      random += possible.charAt(Math.floor(Math.random() * possible.length));
    //
    cb(null, random + file.originalname)
  }
})
const upload = multer({storage:storage})


var { body, validationResult } = require('express-validator');
var Public = require('../schemas/publicSchema.js');
var User = require('../schemas/userSchema.js');

// registeration of the user
router.post('/user/register',
  //body("email").trim().isEmail(),
  //body("password").not().isLowercase().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),

  function(req, res) {
    const errors = validationResult(req);  
    if(!errors.isEmpty()){
        return res.status(400).json({"errors": errors.array()})
    }
  
  const mail = req.body.email;
  const pw = req.body.password;

  User.findOne({email: mail}, (err, user) => {
    if(user) {
      return res.status(403).json({email: "Email already in use"})
    }
    else {
      var salt = bcrypt.genSaltSync(10)
      var hash = bcrypt.hashSync(pw,salt)
      const us = new User({
        email: mail,
        password: hash
      });
      us.save()
      res.json({"res": "ok"})
    }
  })
})

//handles the users login
router.post('/user/login', function(req, res) {
    User.findOne({email: req.body.email}, (err, user) =>{
      if(!user) {
        return res.status(403).json({'msg': "No such email"})
      }
      else {
        bcrypt.compare(req.body.password, user.password, (err, match) => {
          if(err) throw err;
          if (match) {
            var token = jwt.sign(
              { //payload
                email: user.email,
              },
              process.env.SECRET
            )
            return res.json({"success":true, "token": token})
          } else {
            return res.status(403).json({"msg": "wrong password"})
          }
        })
      }
    })
  })

router.get('/user/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
  var id = req.params.id

  //based on viewed site it returns its own profile or others
  Public.findOne({name:id}, (err, public) => {
    
    if (String(public.id) === String(req.user._id)) { 
      //own profile
      
      return res.json({
        "email": req.user.email,
        "name": public.name,
        "info": public.info,
        "date": public.date,
        "photo": public.photo
      }).status(200)
    }
    else if (req.user.email === "admin@admin") {

      User.findOne({_id: public.id}, (err, user) => {

        return res.json({
          "email": user.email,
          "name": public.name,
          "info": public.info,
          "user": "admin",
          "date": public.date,
          "photo": public.photo
        }).status(200)
      })

    }
    else {
      //other profile
      return res.json({
        "name": public.name,
        "info": public.info,
        "date": public.date,
        "photo": public.photo
      })
    }
  })

})

router.get('/private', passport.authenticate('jwt', {session: false}), (req,res) => {
  Public.findOne({id: req.user._id}, (err, user) => {
    if(user) {
      res.json({"user": user.name}).status(200)
    }
    else {
      res.sendStatus(200)
    }
  })
})

router.post('/public', passport.authenticate('jwt', {session: false}), function(req,res) {
  var body = req.body
  var pid = req.user._id
  var date = new Date().toUTCString()

  Public.findOne({id: pid}, (err, user) => {
    if(!user) { 
      // creating a new user and adding it to others neutral array

      // help from https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
      // and here https://stackoverflow.com/questions/73595221/mongoose-updatemany-not-updating-array
      // adding new user to others neutral array
      Public.updateMany({update:true},{$push: {neutral: body.name}}, {returnDocument: true}).exec()
    
      //adding other users to the new user
      Public.find({update:true}, function(err, users) {  
        var userMap = [];
        users.forEach(user => {
          userMap.push(user.name)
        });
      
      const us = new Public({
        id: pid,
        name: body.name,
        info: body.info,
        date: date,
        liked: [],
        dislike: [],
        neutral: userMap
      })
      us.save()
      res.json({res: "ok"})
    })
    }
    else {
      res.json({"res": "user found", user: user.name})}
  })
})

router.post('/picture', passport.authenticate('jwt', {session: false}), 
upload.single("file"), (req,res) => {
  var pid = req.user._id;
  var photo = req.file.filename

  Public.findOneAndUpdate({id: pid}, {photo: photo}, (err,user)=> {})
})

router.post('/picture/update', passport.authenticate('jwt', {session: false}), 
upload.single("file"), (req,res) => {
  var pid = req.user._id;
  var photo = req.file.filename
  var old;
  
  Public.findOne({id:pid}, (err,user) => {
    if (user.photo !== undefined) {
      old = "C:/Users/iidav/Documents/AdvWebApp/project/server/uploads/" + user.photo
  
      fs.unlink(old, (err) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log("File removed")
      })
    }
    
  })
  Public.updateOne({id: pid}, {photo:photo}, (err,user)=> {})
})

router.get('/photo/:name', passport.authenticate('jwt', {session: false}), (req, res) => {
  
  Public.findOne({name:req.params.name}, (err, user)=> {
    if(user.photo) {
      res.json({photo: user.photo})
    }
    else {
      res.json({photo: undefined})
    }
  })
})

router.post('/update/:id', passport.authenticate('jwt', {session: false}),
//body("password").optional().not().isLowercase().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
//body("email").optional().trim().isEmail(),
(req,res) => {
  var id = req.params.id

  const errors = validationResult(req);  
    if(!errors.isEmpty()){
        return res.status(400).json({"errors": errors.array()})
    }

  if(id === "password") {
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(req.body.password, salt)
    
    User.updateOne({_id:req.user._id}, {password:hash}, (err,result)=>{})
    res.sendStatus(200)
  }
  else if (id === "info") {
    Public.updateOne({id:req.user._id}, {info:req.body.info}, (err,result)=>{})
    res.sendStatus(200)
  }
  else if (id === "email") {
    User.updateOne({_id:req.user._id}, {email:req.body.email}, (err,result)=>{})
    res.sendStatus(200)
  }
})

router.get('/neutral', passport.authenticate('jwt', {session: false}), (req,res) => {
  
  Public.findOne({id: req.user._id}, (err, public) =>{
    //making the original list
    if(!public){
      res.json({res: "info"})
    }
    else {
      var original = public.neutral
      
      if (original.length === 0) {
        res.json({res: 0})
        
      }
      else {
        Public.findOne({name: original[0]}, (err, person) => {
          res.json({"name": person.name, "info": person.info})
        })   
      } 
    }
    
  })
})

//updating if they have liked someone
router.put('/opinion/:value', passport.authenticate('jwt', {session: false}), (req, res)=> {
  var value = req.params.value
  var name = req.body.name
  
  Public.findOneAndUpdate({id: req.user._id}, {$pull: {neutral: name}}, (err,result)=>{})

  if(value === "liked") {
    Public.findOneAndUpdate({id: req.user._id}, {$push: {liked: name}}, (err,result)=>{})
  }
  else {
    Public.findOneAndUpdate({id: req.user._id}, {$push: {dislike: name}},(err,result)=>{})
  }
  res.sendStatus(200)
  
})


module.exports = router;