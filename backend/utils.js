const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const validator = require('validator');
const empty = require('is-empty');
const Item = require(('./models/item'))

//Necessary for issuing the jwt
const pathToKey = path.join(__dirname, 'id_rsa_priv.pem')
// console.log(pathToKey)
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
// console.log(PRIV_KEY)

//helper functions

// const findUserItems = (username, email, createdAt, createdItems) => {
// const findUserItems = (username) => {
//   Item.find({ created_by: username }, async (err, data) => {
//     if(err){
//       console.log("error while getting user items")
//       res.status(400).json({ error: "an error occured while retrieving your items"})
//     }else{
//       console.log("no error")
//       // console.log("sending user items from api")
//       return data
//       // res.status(200).json({
//       //   success: true,
//       //   username: req.user.username,
//       //   email: req.user.email,
//       //   createdAt: req.user.createdAt,
//       //   createdItems: req.user.createdItems,
//       //   itemData: data
//       // })
//     }
//   })
// }

const isNotEmptyRegister = (username, email, password) => {
  if(empty(username) || empty(email) || empty(password)){
    return false
  }
  return true;
}
const isNotEmptyLogin = (username, password) => {
  if(empty(username) || empty(password)){
    return false
  }
  return true;
}
const isEmailValid = (email) => {
  return validator.isEmail(email)
};

const validPassword = async (plaintTextPassword, hash) => {
  const valid = await bcrypt.compare(plaintTextPassword, hash)
  console.log("is password valid", valid)
  return valid
};

const genPassword = async (plaintextPassword) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(plaintextPassword, saltRounds)
  // console.log(hash)
  return hash
};

const issueJWT = (user) => {
  const _id = user._id;
  const expiresIn = '1d';

  const payload = {
    sub: _id,
    iat: Date.now()
  };
  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
  //that simple
}

//gonna return to this when cleaning up the code
// module.exports.findUserItems = findUserItems;
module.exports.isEmailValid = isEmailValid;
module.exports.isNotEmptyRegister = isNotEmptyRegister;
module.exports.isNotEmptyLogin = isNotEmptyLogin;
module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
