const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

passport.use(new googleStrategy({
        clientID : env.google_client_id,
        clientSecret : env.google_client_secret,
        callbackURL : env.google_callback_url
    },
    function(accessToken, refreshToken, profile, done){
        User.findOne({email : profile.emails[0].value}).exec(function(err,user){
            if(err){console.log("Error in finding user in google strategy passport !",err); return;}
            console.log(accessToken, refreshToken);
            console.log(profile);
            if(user){
                return done(null, user);
            }
            else{
                User.create({
                    email : profile.emails[0].value,
                    name : profile.displayName,
                    password : crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log("Error in creating user in google strategy passport !",err); return;}
                    return done(null, user);
                });
            }
        });
    }

));

module.exports = passport;