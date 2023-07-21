var createError = require('http-errors'); // Create HTTP error objects
var express = require('express'); // Imports the Express framework
var path = require('path'); // Provide utilities for working with file and directory paths
var cookieParser = require('cookie-parser'); // Parses cookies attached to incoming requests
var logger = require('morgan'); // HTTP request logger middleware for Node.js
var session = require('express-session'); // Provides session middleware for Express
var passport = require('passport'); // Imports the Passport module, enabling authentication
var methodOverride = require('method-override'); // Allows overriding HTTP methods for using PUT or DELETE

global.__basedir = __dirname;
// Sets up a global variable to provide reference to base directory path

require('dotenv').config();
// Connect to the database with AFTER the config vars are processed
require('./config/database');

require('./config/passport');
// Sets up authentication with Passport

const indexRouter = require('./routes/index');
// Handles routes related to the homepage
const confectionsRouter = require('./routes/confections');
// Handles routes related to confections
const commentsRouter = require('./routes/comments');
// Handles routes dealing with comments

var app = express();
// Configures and defines routes/middleware/other settings using Express

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// View engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  // Middleware enables session support in the app
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
// Middleware initializes Passport and adds it to the middleware chain
app.use(passport.session());
// Middleware adds support for login sessions using Passport

app.use(function (req, res, next) {
  // Middleware makes authenticated user object available in the view templates, placed below Passport middleware
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
// Uses indexRouter middleware to handle requests to the root URL
app.use('/confections', confectionsRouter);
// Uses confectionsRouter middleware to handle requests to the /confections URL
app.use('/', commentsRouter);
// Uses commentsRouter middleware to handle requests to the root URL

app.use(function(req, res, next) {
  // Catch 404 and forward to error handler
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // Error handler
  res.locals.message = err.message;
  // Set locals, only providing error in development
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;