const express = require('express');
// Imports the Express framework
const router = express.Router();
// Creates a router object using Express
const commentsCtrl = require('../controllers/comments');
// Imports the comments controller
const ensureLoggedIn = require('../config/ensureLoggedIn');
// Require the authorization middleware

router.post('/confections/:id/comments', ensureLoggedIn, commentsCtrl.create);
// POST /confections/:id/comments (create comment)
router.delete('/comments/:id', ensureLoggedIn, commentsCtrl.delete);
// DELETE /comments/:id (delete comment)

module.exports = router;
// Exports the router object