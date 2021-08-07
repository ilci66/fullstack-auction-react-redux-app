const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt; 

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
  jwtFromRequest: ExtractJwt.
  fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};

const strategy = new JwtStrategy(options, (payload, done) => {
  User.findOne({_id: payload.sub})
    .then((user) => {
      if(user) return done(null, user)
      return done(null, false) 
    })
    .catch(error => done(error, null))
});

//so basically just exporting the passport I did the configs for,
//the passport in the arguments will be provided by the server.js 
module.exports = (passport) => {
  passport.use(strategy)
}