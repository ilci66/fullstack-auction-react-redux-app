const mongoose = require('mongoose');
// const Bid = require('./bid.js');

const bidSchema = new mongoose.Schema({
  bidder: String,
  amount: String
}, {timestamps:true});

const itemSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
  buyout: String,
  starting: String,
  created_by: String,
  //didn't use it anywhere, unnecessary at this point
  // isBid: {type: Boolean, default: false, index:true},
  bids: [bidSchema]
}, {timestamps: true});

itemSchema.index({ updatedAt: 1}, { expireAfterSeconds: 7*24*60*60, partialFilterExpression : {isBid: false} })

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;