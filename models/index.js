var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/techspace");

module.exports.Event = require('./event.js');
