const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  bidder: String,
  bid: String
}, {timestamps:true});

const Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;