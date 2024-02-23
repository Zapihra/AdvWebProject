require('dotenv').config();
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var passport = require('passport');
var User = require('../schemas/userSchema')

module.exports = function (passport){
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
}

