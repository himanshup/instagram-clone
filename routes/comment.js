const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports = router => {
  router.post("/posts/:post_id/comments", (req, res) => {
    let postInfo = {};
    Post.findById(req.params.post_id)
      .then(post => {
        postInfo = post;
        return Comment.create(req.body.comment);
      })
      .then(comment => {})
      .catch(error => {
        console.log(error);
      });
  });
};
