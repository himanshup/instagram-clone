const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  username: String,
  avatar: String
});

module.exports = mongoose.model("User", userSchema);
