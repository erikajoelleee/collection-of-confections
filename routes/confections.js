const express = require('express');
// Imports the Express framework
const router = express.Router();
// Creates a router object using Express
const confectionsCtrl = require('../controllers/confections');
// Imports the confections controller
const ensureLoggedIn = require('../config/ensureLoggedIn');
// Require the authorization middleware
const multer = require('multer');
// Imports the multer middleware for handling file uploads
const upload = multer({ dest: 'public/uploads/' });
// Creates the upload object with the destination directory set to public/uploads/

router.get('/', confectionsCtrl.index);
// GET /confections
router.get('/new', ensureLoggedIn, confectionsCtrl.new);
// GET /confections/new (request new sneaker while logged in)
router.get('/:id', confectionsCtrl.show);
// GET /confections/:id (show sneaker)
router.get('/:id/edit', ensureLoggedIn, confectionsCtrl.edit);
// GET /confections/:id/edit (edit sneaker while logged in)
router.put('/:id', ensureLoggedIn, confectionsCtrl.update);
// PUT /confections/:id (update sneaker while logged in)
router.post('/', ensureLoggedIn, upload.single('avatar'), confectionsCtrl.create);
// POST /confections (submit sneaker with image while logged in)
router.delete('/:id', ensureLoggedIn, confectionsCtrl.delete);
// DELETE /confections/:id (delete sneaker while logged in)
	
module.exports = router;
// Exports the router object