const passport = require('passport');
let JWTStrategy = require('passport-jwt').Strategy;
let ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const env = require('./environment');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(), //we'll be finding the jwt from the header
    secretOrKey : env.jwt_secret //and it will be decrypted using the key - > jwt secret
};

passport.use(new JWTStrategy(opts, function(jwtPayload, done) {
    User.findById(jwtPayload._id, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;