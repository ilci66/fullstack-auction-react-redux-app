const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt')


router.get('/items', (req, res) => {
  
})


router.post('/signup', (req, res) => {
  passport.authenticate('signup', (err, user, info) => {
    console.log("err>>>",err)
    console.log("user>>>", user)
    console.log("info>>>", info)
  })
})