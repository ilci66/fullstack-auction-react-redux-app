const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport');
const User = require('./models/user.js');
const Item = require('./models/item.js');


router.get('/items', (req, res) => {
  
})


router.post('/signup', (req, res) => {
  console.log('sign up backend')
  
    
  passport.authenticate('signup', (err, user, info) => {
    consol.log("req user", req.user)
    console.log("err>>>",err)
    console.log("user>>>", user)
    console.log("info>>>", info)
    res.json(req.user)
  })
})
module.exports = router;