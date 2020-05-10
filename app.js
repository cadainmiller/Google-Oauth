const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

const app = express();

//Linking public assets
app.use(express.static(__dirname + '/public'));

//Setup view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Database connection string
mongoose.connect(keys.mongodb.dbURI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, () => {
  console.log('Database was connected');
});

//setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//Home route
app.get('/', (req, res) => {
  res.render('home');
});

//Server
app.listen(3000, () => {
  console.log('Sever is started on port 3000');
});
