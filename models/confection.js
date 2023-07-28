const mongoose = require("mongoose"); // Imports Mongoose library module for MongoDB; shortcut to the mongoose.Schema class
const Schema = mongoose.Schema; // Assigns the schema property of the Mongoose object to define data schemas for MongoDB

const commentSchema = new Schema(
  // This schema describes the structure and data types of the comments object
  {
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);

const imgSchema = new Schema({
  // This schema describes the structure and properties of an image required to store the image data
  image: {
    data: String,
    contentType: String,
  },
});

const confectionSchema = new Schema(
  // This schema describes the structure and data types of a confection object
  {
    comments: [commentSchema],
    image: imgSchema,
    name: { type: String, required: true },
    kind: {
      type: String,
      enum: [
        "candy",
        "bread",
        "pastry",
        "cookies",
        "donut",
        "pie",
        "cake",
        "ice cream",
        "other",
      ],
    },
    country: {
      type: String,
    },
    dateReviewed: {
      type: Date,
      default: function () {
        return new Date(new Date().setFullYear(new Date().getFullYear()));
      },
    },
    history: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Confection", confectionSchema);
// Compiles the schema into the confection model and exports it to perform CRUD operations in the database
