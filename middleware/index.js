const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports = {
  checkPostOwnership: (req, res, next) => {
    Post.findOne({ _id: req.params.post_id })
      .populate("comments")
      .populate("likes")
      .then(post => {
        if (post.author.id.equals(req.user._id)) {
          next();
        } else {
          return res.json({ error: "You don't have permission to do that." });
        }
      })
      .catch(err => {
        console.log(err);
        res.json({ error: "Sorry, that post doesn't exist." });
      });
  },

  checkCommentOwnership: (req, res, next) => {
    Comment.findOne({ _id: req.params.comment_id })
      .then(comment => {
        if (comment.author.id.equals(req.user._id)) {
          next();
        } else {
          return res.json({ error: "You don't have permission to do that." });
        }
      })
      .catch(err => {
        res.json({ error: "Sorry, that comment doesn't exist" });
      });
  }
};
