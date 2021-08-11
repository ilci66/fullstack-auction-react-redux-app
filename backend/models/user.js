const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdItems: [String],
  won_items: [String]
}, { timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User