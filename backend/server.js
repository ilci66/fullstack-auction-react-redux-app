const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  //the fix for the deprecation warning
  useCreateIndex: true
  }).then(() => console.log('Connected to database')) 

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App is listening on port: ${5000}`))