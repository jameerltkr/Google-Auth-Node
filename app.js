// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
  var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
// configuration ===============================================================

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'jade'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'jameer_khan_test_secret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
 

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(obj, done) {
            done(null, obj);
    });
 
passport.use(new GoogleStrategy({
    clientID: '1074211110303-58brbb05ns9d6puacvknpccf3gml1i0f.apps.googleusercontent.com',
    clientSecret: 'iRGYUpHL2k-FNTdoCMZ2WlzL',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('ID: '+profile.id);
    console.log('Name: '+profile.displayName);
    console.log('Email : '+profile.emails[0].value);
   return done(null,profile);
  }
));

// routes ======================================================================
require('./routes/index.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);


