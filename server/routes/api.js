require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.set('strictQuery', true)
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var { body, validationResult } = require('express-validator');

const usersSchema = new mongoose.Schema({
  email: {type: String},
  password: {type: String},
});

const publicSchema = new mongoose.Schema({
  id: {type: Object},
  name: {type: String},
  info: {type: String},
  neutral: {type: Array},
  liked: {type: Array},
  dislike: {type: Array}
});

const User = mongoose.model('Users', usersSchema)
const Public = mongoose.model('Public', publicSchema)

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
        "info": public.info
      }).status(200)
    }
    else {
      //other profile
      
      return res.json({
        "name": public.name,
        "info": public.info
      })
    }
  })

})

router.get('/private', passport.authenticate('jwt', {session: false}), (req,res) => {
  res.sendStatus(200)
})

router.post('/public', passport.authenticate('jwt', {session: false}), function(req,res) {
  var body = req.body
  var pid = req.user._id
  //console.log(body, pid)


  Public.findOne({id: pid}, (err, user) => {
    if(!user) { 
      // creating a new user and adding it to others neutral array

      // help from https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
      // and here https://stackoverflow.com/questions/73595221/mongoose-updatemany-not-updating-array
      // adding new user to others neutral array
      Public.updateMany({},{$push: {neutral: body.name}}, {returnDocument: true}).exec()
    
      //adding other users to the new user
      Public.find({}, function(err, users) {  
        var userMap = [];
        users.forEach(user => {
          userMap.push(user.name)
        });
      
      const us = new Public({
        id: pid,
        name: body.name,
        info: body.info,
        liked: [],
        dislike: [],
        neutral: userMap
      })
      us.save()
      res.json({res: "ok"})
    })
    }
    else {
      console.log(user)
      res.json({"res": "user found", user: user.name})}
  })
})

module.exports = router;