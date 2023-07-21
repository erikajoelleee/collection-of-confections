const mongoose = require("mongoose"); // Imports Mongoose library module for MongoDB; shortcut to the mongoose.Schema class
const Schema = mongoose.Schema; // Assigns the schema property of the Mongoose object to define data schemas for MongoDB

const userSchema = new Schema(
  // This schema describes the structure and data types of the user object
  {
    name: String,
    googleId: {
      type: String,
      required: true,
    },
    email: String,
    avatar: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
// Compiles the schema into the user model and exports it to perform CRUD operations in the database