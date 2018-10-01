const Post = require("../db/models/post");
const Comment = require("../db/models/comment");
const mongoose = require("mongoose");
mongoose.Promise = Promise;

module.exports = router => {
  // create comment
  router.post("/posts/:post_id/comments", (req, res) => {
    let newComment = {};
    Post.findById(req.params.post_id)
      .then(post => {
        return Comment.create({ text: req.body.comment });
      })
      .then(comment => {
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        comment.save();
        return (newComment = comment);
      })
      .then(result => {
        return Post.findById(req.params.post_id).populate("comments likes");
      })
      .then(post => {
        post.comments.push(newComment);
        post.save();
        const data = {
          postId: post._id,
          comment: newComment
        };
        return res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  // comment edit route
  router.get("/posts/:post_id/comments/:comment_id/edit", (req, res) => {
    Comment.findOne({ _id: req.params.comment_id })
      .then(comment => {
        res.json(comment.text);
      })
      .catch(err => {
        res.json(err.message);
      });
  });

  // edit comment
  router.put("/posts/:post_id/comments/:comment_id", (req, res) => {
    Comment.findOneAndUpdate(
      { _id: req.params.comment_id },
      { text: req.body.comment }
    )
      .then(response => {
        console.log(response);
        res.json({ message: "Successfully edited your comment!" });
      })
      .catch(err => {
        res.json({ message: "Error editing your comment" });
      });
  });

  // delete comment
  router.delete("/posts/:post_id/comments/:comment_id", (req, res) => {
    Post.findOneAndUpdate(
      { _id: req.params.post_id },
      { $pull: { comments: req.params.comment_id } }
    )
      .then(post => {
        return Comment.findOneAndRemove({ _id: req.params.comment_id });
      })
      .then(comment => {
        res.json({ message: "Deleted your comment" });
      })
      .catch(err => {
        res.json({ message: "Error deleting your comment" });
      });
  });
};
