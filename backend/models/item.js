const mongoose = require('mongoose');
const Bid = require('./bid.js');

const itemSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
  buyout: String,
  isBid: {type: Boolean, default: false, index:true},
  bids: [Bid]
}, {timestamps: true});

itemSchema.index({createdAt: 1}, {expireAfterSeconds: 24*60*60,partialFilterExpression : {isBid: false}})

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;