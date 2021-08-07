const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const validator = require('validator');
const empty = require('is-empty');

//Necessary for issuing the jwt
const pathToKey = path.join(__dirname, 'id_rsa_priv.pem')
// console.log(pathToKey)
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
// console.log(PRIV_KEY)

//helper functions

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

module.exports.isEmailValid = isEmailValid;
module.exports.isNotEmptyRegister = isNotEmptyRegister;
module.exports.isNotEmptyLogin = isNotEmptyLogin;
module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
