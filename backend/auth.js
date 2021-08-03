const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJWT;


const User = require('./models/user');

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'username',
      emailField: 'email',
      passwordField: 'password'
    }, 
    async (username, email, password, done) => {
      try{
        const data = await User.findOne({username: username}).exec();
        if(data) return done(null, false, 'username taken')
        return done(null, user)
      }catch(error){
        console.log(error)
        done(error)
      }
    }
  )
)