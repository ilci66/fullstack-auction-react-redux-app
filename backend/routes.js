const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport');
const User = require('./models/user.js');
const Item = require('./models/item.js');
const utils = require('./utils')
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

router.get('/user/items', passport.authenticate('jwt', { session: false }), (req, res) => {
  // console.log("getting items of username>>>", req.user.username)
  Item.find({ created_by: req.user.username }, (err, data) => {
    if(err){
      res.status(400).json({ error: "an error occured while retrieving your items"})
    }else{
      console.log("sending user items from api")
      res.status(200).json({
        success: true,
        username: req.user.username,
        email: req.user.email,
        createdAt: req.user.createdAt,
        createdItems: req.user.createdItems,
        itemData: data
      })
    }
  })
})

router.post('/item/create', passport.authenticate('jwt', { session: false }), (req, res) => {
  // console.log('req.body in create >>', req.body)
  // console.log("created by >>>",req.user.username)
  const { isEdit, image, name, itemDescription, buyout, starting} = req.body;
  if(empty(name) || empty(itemDescription) || empty(buyout) || empty(starting) || empty(image)){
    return res.status(400).json({error: "Missing required fields"})
  }
  // res.status(200).json({ success: true, message: "hey"})
  //checking the edit again here just to be sure
  if(!isEdit){
    Item.findOne({name: name}, async (err, data) => {
      if(err){
        res.status(400).json({ error: "an error occured when searching in database"})
        return;
      }else if(data){
        res.status(400).json({ error: "An item with the same name exists in database"})
        return;
      } else {
        const newItem = await new Item({
          image: image,
          name: name,
          description: itemDescription,
          buyout: buyout,
          created_by: req.user.username,
          starting: starting
        })
        newItem.save((err, data) => {
          if(err){
            res.status(400).json({ error: "an error occured while saving item"})
            return;
          }else{
            //I don't know why I didn't just use find one update but yeah
            User.findOne({ username: req.user.username }, (err, userData) => {
              userData.createdItems = [...userData.createdItems,data._id]
              userData.save((err, data) => {
                // res.status(200).json({ success: true, message: "succesfully created"})
                Item.find({ created_by: req.user.username }, (err, data) => {
                  if(err){
                    res.status(400).json({ error: "an error occured while retrieving your items"})
                  }else{
                    console.log("sending user items from api")
                    res.status(200).json({
                      success: true,
                      username: req.user.username,
                      email: req.user.email,
                      createdAt: req.user.createdAt,
                      createdItems: req.user.createdItems,
                      itemData: data
                    })
                  }
                })
                return;
              })
            })
          }
        })
      }
    })
  }
})

router.get('/item/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  //use this route to get one item in to later user for edit or bid request
  const { id } = req.params;
  console.log(id)
  Item.findById({ _id:id }, (err, data) => {
    if(err) {
      console.log("error in loooking for the item")
      res.status(400).json({error: `${err}`})
    } else if(!data) {
      console.log("no item in database")
      res.status(400).json({error: "can't find the item"})
    } else {
      console.log("actually sending the data")
      res.status(200).json({ success: true, itemData: data})
    }
  })
})

router.patch('/item/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log("reaches here")
  const { isEdit, name, description, buyout, starting} = req.body;
  if(empty(name) || empty(description) || empty(buyout) || empty(starting)){
    return res.status(400).json({error: "Missing required fields"})
  }
  Item.findOneAndUpdate(
    {name: name}, 
    {
      name: name, 
      description: description, 
      buyout: buyout,
      starting: starting
    }, 
    {new: true},
    async (err, data) => {
      if(err){
        res.status(400).json({ error: "an error occured when searching in database"})
        return;
      }else if(!data){
        res.status(400).json({ error: "there is no data to edit in the database"})
      }else {
        console.log('item edited')
        // res.status(200).json({ success: true, message: "succesfully edited"})
        Item.find({ created_by: req.user.username }, (err, data) => {
          if(err){
            res.status(400).json({ error: "an error occured while retrieving your items"})
          }else{
            console.log("sending user items from api")
            res.status(200).json({
              success: true,
              username: req.user.username,
              email: req.user.email,
              createdAt: req.user.createdAt,
              createdItems: req.user.createdItems,
              itemData: data
            })
          }
        })
        return;
      }
    }
  )
});


router.get('/item/bid', passport.authenticate('jwt', { session: false }), (req, res) => {
  
});

router.delete('item/delete',  passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log("delete backend")

})



router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  // console.log("this is the req.user>>>>", req.user)
  return res.status(200).json({ 
    success: true,
    username: req.user.username,
    email: req.user.email,
    createdAt: req.user.createdAt,
    createdItems: req.user.createdItems
  })
})

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