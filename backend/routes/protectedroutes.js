const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport');
const User = require('../models/user.js');
const Item = require('../models/item.js');
const utils = require('../utils')
const empty = require('is-empty')
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

router.post('/item/payment', async (req, res) => {
  console.log("frst items ",req.body[0])
  const items  = req.body
  let storeItems = []
  let promiseChain = new Promise((resolve, reject) => {
    items.map(item =>{Item.find({ _id: item }, (err, data) => {
      if(data){
        storeItems.push(data)
        return storeItems
      }else{
        console.log('not working bro')
      }
    })})
  })
  promiseChain.then(result => console.log("this is the result",result))

  // try {
  //   console.log("in try")
  //   const session = await stripe.checkout.sessions.create({
  //     payment_method_types: ["card"],
  //     mode: "payment",
  //     line_items: items.map(async item => {
  //       console.log("it here")
  //       const storeItem = await Item.find({_id : item})
        
  //       console.log("storeItem>>>",storeItem.buyout)
  //       return {
  //         price_data: {
  //           currency: "usd",
  //           product_data: {
  //             name: storeItem.name
  //           },
  //           unit_amount: Math.round(parseFloat(storeItem.buyout) * 100),
  //         },
  //         quantity: 1
  //       }
  //     }),
  //     success_url: `${process.env.FRONTEND_URL}/payment-success`,
  //     cancel_url: `${process.env.FRONTEND_URL}/payment-fail`,
  //   })
  //   console.log("comes at urls")
  //   res.json({ url: session.url })
  // } catch (error) {
  //   console.log(error.message)
  //   res.status(400).json({ error: error.message })
  // }
})

router.delete('/item/:id', (req, res) => {
  console.log("delete backend")
  const { id } = req.params
  Item.findOneAndRemove({ _id: id }, (err, data) => {
    if(err || !data){
      res.status(400).json({error: "an error occured while deleting item"})
      return;
    } else {
      Item.find({ created_by: req.user.username }, (err, data) => {
        if(err){
          res.status(400).json({ error: "an error occured while retrieving your items"})
        }else{
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
      // res.status(200).json({ success: true, message: "successfuly deleted"})
      return;
    }
  }) 
  
})

router.post('/item/create', (req, res) => {
  const { isEdit, image, name, itemDescription, buyout, starting} = req.body;
  if(empty(name) || empty(itemDescription) || empty(buyout) || empty(starting) || empty(image)){
    return res.status(400).json({error: "Missing required fields"})
  }
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
            User.findOne({ username: req.user.username }, (err, userData) => {
              userData.createdItems = [...userData.createdItems,data._id]
              userData.save((err, data) => {
                Item.find({ created_by: req.user.username }, (err, data) => {
                  if(err){
                    res.status(400).json({ error: "an error occured while retrieving your items"})
                  }else{
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

router.get('/item/:id', (req, res) => {
  //use this route to get one item in to later user for edit or bid request
  const { id } = req.params;
  // console.log(id)
  Item.findById({ _id:id }, (err, data) => {
    if(err) {
      console.log("error in loooking for the item")
      res.status(400).json({error: `${err}`})
    } else if(!data) {
      console.log("no item in database")
      res.status(400).json({error: "can't find the item"})
    } else {
      // console.log("actually sending the data", data)
      res.status(200).json({ success: true, user: req.user ,itemData: data})
    }
  })
})


router.patch('/item/edit', (req, res) => {
  console.log("reaches here")
  const { isEdit, name, description, buyout, starting} = req.body;
  console.log("edit ? >>", isEdit)
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


router.post('/item/bid', (req, res) => {
  // console.log("in bid" ,req.user)
  const { username } = req.user;
  const { id, amount } = req.body;
  console.log(username, id, amount)
  Item.findOne({ _id: id }, (err, data) => {
    if(err){
      res.status(400).json({error: "an error occured in database"})
      return;
    } else if(!data){
      res.status(400).json({error: "no such item in database"})
      return;
    } else {
      console.log("bid placed")
      data.bids.push({ bidder: username, amount: amount})
      data.isBid = true
      data.save((err, savedData) => {
        if(err){
          console.log("save error")
          res.status(400).json({error: "an error occured while saving"})
          return;
        } else {
          console.log("savedData", savedData.bids)
          res.status(200).json({ success: true, data: savedData})
          return;
        }
      })
    }
  })
});

router.get('/user/items', (req, res) => {
  // console.log("getting items of username>>>", req.user.username)
  const { username } = req.user;
  
  Item.find({ created_by: req.user.username }, (err, data) => {
    if(err){
      res.status(400).json({ error: "an error occured while retrieving your items"})
    }else{
      // console.log("sending user items from api")
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


//I used this route for testing jwt only
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

module.exports = router;