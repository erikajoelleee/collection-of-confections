require('dotenv').config();
// If the database connection string is in a .env file, we need to read in those env variables just like in server.js
require('./config/database');
// Connect to the database

const Confection = require('./models/confection');
// Require the app's Mongoose models

let confections = await Confection.find({});
console.log(confections);
// Top-level await (using await outside of an async function)