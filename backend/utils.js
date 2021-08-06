const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

//Necessary for issuing the jwt
const pathToKey = path.join(__dirname, 'id_rsa_priv.pem')
// console.log(pathToKey)
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
// console.log(PRIV_KEY)

//helper functions
const validPassword = (password, hash) => {
  //compare password with hashed from database
};

const genPassword = () => {
  //generete the password to save in the database
};

const issueJWT = (user) => {
  //well issue jwt :)
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
