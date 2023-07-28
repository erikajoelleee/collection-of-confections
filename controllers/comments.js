const Confection = require("../models/confection"); // Imports the confection model

module.exports = {
  create,
  delete: deleteComment,
};
// Exports objects that contains these functions, which can be accessed and used by other parts of the application

function deleteComment(req, res) {
  // Deletes comments associated with the confection
  Confection.findOne({
    // Uses the fineOne method on the confection model to find a confection that matches the comment and user ID
    "comments._id": req.params.id,
    "comments.user": req.user._id,
  }).then(function (confection) {
    if (!confection) return res.redirect("/confections");
    // If no matching confection is found, the function redirects the user to the confections collection page
    confection.comments.remove(req.params.id);
    // If a matching confection is found, it removes the comment form the comments array
    confection
      // Then it saves the modified confection object
      .save()
      .then(function () {
        // If the save operation is successful, it redirects the user to the details page of the corresponding confection
        res.redirect(`/confections/${confection._id}`);
      })
      // If there is an error during the save operation, it is caught and the error is passed
      .catch(function (err) {
        return next(err);
      });
  });
}

async function create(req, res) {
  // Creates comments associated with the confection
  try {
    // First uses the confection model to find the confection with the specific confection ID
    const confection = await Confection.findById(req.params.id);
    // Then modifies the req.body object by adding properties related to the user
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // Logs the modified req.body comment object to the console
    console.log(req.body);
    // The comment is then pushed to the comments array of the confection using Mongoose
    confection.comments.push(req.body);
    // It is then saved to the database
    await confection.save();
    // If there is an error, it is caught and the error is logged
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/confections/${req.params.id}`);
  // Redirects user to the details page of the corresponding confection
}
