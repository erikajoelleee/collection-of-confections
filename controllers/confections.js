const Confection = require("../models/confection"); // Imports the "Confection" model
const fs = require("fs"); // Provides methods for interacting with the file system
const path = require("path"); // Provides utility functions for working with file and directory paths

module.exports = {
  index,
  show,
  new: newConfection,
  create,
  delete: deleteConfection,
  edit,
  update
};
// Exports objects that contains these functions, which can be accessed and used by other parts of the application

async function index(req, res) {
  // Retrieves all confections from the database and renders a view to display them in the collection
  const confections = await Confection.find({});
  res.render("confections/index", { title: "COLLECTION", confections });
}

async function show(req, res) {
  // Retrieves a specific confection from the collection database based on the confection ID
  const confection = await Confection.findById(req.params.id);
  // Logs the confection object to the console and renders a view to display its details
  console.log("confection", confection);
  res.render("confections/show", { title: "DETAILS", confection });
}

function newConfection(req, res) {
  // Renders a view for creating a new confection
  res.render("confections/new", { title: "ADD Confection", errorMsg: "" });
}

async function create(req, res) {
  // Handles creation of a new confection
  console.log(req.body)
  // Checks if the uploaded file is a valid image by calling the isIMG function (jpeg or png)
  if (!isImg(req.file.mimetype)) {
    console.log("You must upload a jpeg or png");
    fs.unlinkSync(__basedir + `/public/uploads/${req.file.filename}`);
    return res.redirect("/posts/new");
  }
  // Uses multer middleware for handling multipart/form-data to upload the files
  // Prepares the avatar object with the file information
  const avatar = {
    image: {
      data: path.join("uploads/" + req.file.filename),
      contentType: req.file.mimetype,
    },
  };
  // Adds the avatar to the request body
  req.body.image = avatar;
  try {
    // Creates a new confection in the database using the provided data
    const confection = await Confection.create(req.body);
    console.log(confection);
    // Redirects the user to the details page of the newly created confection
    res.redirect(`/sneakers/${confection._id}`);
  } catch (err) {
    // If there is an error during the creation process, it is logged
    console.log(err);
    // Renders the new confection creation page again with an error message
    res.render("confections/new", { title: "ADD CONFECTION", errorMsg: err.message });
  }
}

async function deleteConfection(req, res) {
  // Deletes a confection from the database based on the confection ID
  await Confection.findByIdAndDelete(req.params.id);
  // Redirects the user to the confections collection page
  res.redirect("/confections");
}

function isImg(mimetype) {
  // Takes a MIME type as input providing an array of valid image MIME types (jpeg or png)
  const validImgTypes = ["image/jpeg", "image/png"];
  // Checks if the provided MIME type is included in the array of valid images
  return validImgTypes.includes(mimetype);
}

async function update(req, res) {
  try {
    // Updates an existing confection in the database with the provided information
    await Confection.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
    // Redirects the user to the confections collection page
    res.redirect("/confections"); 
  } catch (err) {
    // If there is an error during the update process, it is logged
    console.log(err);
    // Renders the confection edit page
    res.render("confections/edit", { title: "UPDATE CONFECTION" });
  }
}

async function edit(req, res) {
  // Retrieves a specific confection from the database based on the provided ID
  const confection = await Confection.findById(req.params.id);
  res.render("confections/edit", { title: "UPDATE", confection });
}