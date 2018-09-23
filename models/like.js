const mongoose = require("mongoose");

let likeSchema = new mongoose.Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  avatar: String
});

module.exports = mongoose.model("Like", likeSchema);
