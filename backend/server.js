const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport')
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes/routes.js')
const protectedRoutes = require('./routes/protectedroutes.js')

const app = express();

// test if this is actually necessary
require('./config/passport')(passport);

app.use(passport.initialize());

app.use(bodyParser.json({limit: '16mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '16mb', extended: true }))

app.use(
  cors({
    // commented for now
    origin:"http://localhost:3000",
    credentials: true,
  })
)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  //the fix for the deprecation warning
  useCreateIndex: true
  }).then(() => console.log('Connected to database')) 




// require('./auth.js')


const port = process.env.PORT || 5000;

app.use('/', routes)
app.use('/', passport.authenticate('jwt', { session: false }), protectedRoutes)


app.listen(port, () => console.log(`App is listening on port: ${5000}`))