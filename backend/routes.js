const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport');
const User = require('./models/user.js');
const Item = require('./models/item.js');
const utils = require('./utils')

router.get('/items', (req, res) => {
  
})

router.get('/profile', (req, res) => {
  res.send('Reached a protected route')
})

router.post('/register', (req, res) => {
  console.log('req. body info', req.body)
  const { username, password, email } = req.body;

  if(!utils.isNotEmpty(username, email, password)){
    res.status(400).json({ error: "missing required fields" })
    return;
  };
  if(!utils.isEmailValid(email)){
    res.status(400).json({ error: "email is invalid"})
    return;
  };
  
  User.findOne({ username: username }, async (err, data) => {
    if(err){
      return res.status(400).json({ error: `An error occured: ${err}`})
    } else if(data) {
      return res.status(400).json({ error: "username taken"})
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
          res.status(201).json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires});
        })
        .catch(error => console.log(error))
    }
  })
  



})
module.exports = router;