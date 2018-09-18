const Post = require("../models/post");
const User = require("../models/user");
const fs = require("fs");
const cloudinary = require("cloudinary");

module.exports = {
  getAll: (req, res, next) => {
    Post.find(req.params.id)
      .populate("author")
      .populate("comments.author")
      .exec((err, post) => {
        if (err) res.send(err);
        else if (!post) res.send(404);
        else res.send(post);
        next();
      });
  },

  addPost: (req, res, next) => {
    let { image, description, tags, likes } = req.body;
    savePost({ image, description, tags, likes });

    function savePost(obj) {
      new Post(obj).save((err, post) => {
        if (err) {
          res.send(err);
        } else if (!post) {
          res.send(400);
        } else {
          return post.addAuthor(req.body.author_id).then(_post => {
            return res.send(_post);
          });
        }
        next();
      });
    }
  }
};
