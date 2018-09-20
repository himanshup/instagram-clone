const mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
  image: String,
  imageId: String,
  description: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  tags: [],
  timePosted: { type: Date, default: Date.now },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      text: String
    }
  ]
});

module.exports = mongoose.model("Post", postSchema);
