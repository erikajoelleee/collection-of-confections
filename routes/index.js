const express = require('express');
// Imports the Express framework
const router = express.Router();
// Creates a router object using Express
const passport = require('passport');
// Imports the Passport module, enabling authentication

router.get('/', function(req, res, next) {
  // Sets up root path and renders index view for the homepage
  res.render('index', { title: 'Collection of Confections' });
});

router.get('/auth/google', passport.authenticate(
  // Google OAuth login route
  'google',
  // Shows which passport strategy is being used
  {
    scope: ['profile', 'email'],
    // Requests the user's profile and email
  }
));

router.get('/oauth2callback', passport.authenticate(
  // Google OAuth callback route
  'google',
  {
    successRedirect: '/confections',
    failureRedirect: '/confections'
  }
));

router.get('/logout', function(req, res){
  // Oauth logout route
  req.logout(function() {
    res.redirect('/confections');
  });
});

module.exports = router;
// Exports the router object