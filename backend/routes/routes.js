const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user.js');
const Item = require('../models/item.js');
const utils = require('../utils')
const empty = require('is-empty')

router.get('/items', (req, res) => {
  Item.find({}, (err, data) => {
    if(err){
      res.status(400).json({ error: "something went wrong"})
    } else {
      res.status(200).json({ data: data })
    }
  })
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("login attempt", username, password)

  if(!utils.isNotEmptyLogin(username, password)){
    console.log("missing fileds")
    res.status(400).json({ error: "missing required fields" })
    return;
  }
  User.findOne({ username: username}, async (err, user) => {
    if(err){
      console.log("database error")
      return res.status(400).json({ success: false, error: `an error occured: ${err}`})
    } else if(!user) {
      console.log("no user in database")
      return res.status(400).json({ success: false, error: "unknown username"})
    } else {
      console.log("found the user")
      const isValid = await utils.validPassword(password, user.password)
      if(!isValid){
        console.log("incorrect password")
        return res.status(400).json({ success: false, error: "incorrect password"})
      } else {
        console.log("everything right sending token")
        const tokenObj = utils.issueJWT(user)
        res.status(200).json(
          { success: true, 
            user: { 
              username: user.username, 
              email: user.email, 
              createdAt: user.createdAt
            }, 
            token: tokenObj.token, 
            expiresIn: tokenObj.expires 
          }
        );
      }
    }
  })
});

router.post('/register', (req, res) => {
  console.log('req. body info', req.body)
  const { username, password, email } = req.body;

  if(!utils.isNotEmptyRegister(username, email, password)){
    res.status(400).json({ success: false, error: "missing required fields" })
    return;
  };
  if(!utils.isEmailValid(email)){
    res.status(400).json({ success: false, error: "email is invalid"})
    return;
  };
  
  User.findOne({ username: username }, async (err, data) => {
    if(err){
      return res.status(400).json({ success: false, error: `An error occured: ${err}`})
    } else if(data) {
      return res.status(400).json({ success: false, error: "username taken"})
    } else {
      const passwordToSave = await utils.genPassword(password);

      const newUser = new User({
        username: username,
        email: email,
        password: passwordToSave
      });

      newUser.save()
        .then(user => {
          console.log("registered new user")
          // res.status(201).json(user)
          const jwt = utils.issueJWT(user)
          res.status(201).json(
            { 
              success: true, 
              user: { 
                username: user.username,
                email: user.email, 
                createdAt: user.createdAt
              }, 
              token: jwt.token, 
              expiresIn: jwt.expires
            }
          );
        })
        .catch(error => console.log(error))
    }
  })
})



module.exports = router;