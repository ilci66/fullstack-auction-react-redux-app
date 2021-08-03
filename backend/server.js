const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes.js')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use(
  cors({
    origin:"http://localhost:3000",
    credentials: true,
  })
);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  //the fix for the deprecation warning
  useCreateIndex: true
  }).then(() => console.log('Connected to database')) 

require('./auth.js')

const port = process.env.PORT || 5000;

app.use('/', routes)


app.listen(port, () => console.log(`App is listening on port: ${5000}`))