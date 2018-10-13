const mongoose = require("mongoose");
const Post = require("../models/post");
const Comment = require("../models/comment");
const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

const newPost = {
  image:
    "https://happytoutou.wamiz.com/wp-content/uploads/2017/04/voici-ryuji-le-shiba-inu-06.jpg",
  description: "this is a caption",
  author: {
    id: "5bb1dc87e6e8262e68bf770c",
    username: "bob",
    avatar:
      "https://res.cloudinary.com/dmrien29n/image/upload/v1538382982/gbeob3s16h6pttixyecf.jpg"
  }
};

const newComment = {
  text: "this is a test comment",
  author: {
    id: "5bb1dc87e6e8262e68bf770c",
    username: "bob"
  }
};

deletePost = (id, done) => {
  Post.findOne({ _id: id })
    .then(async post => {
      await Comment.deleteMany({ _id: { $in: post.comments } });
      return post;
    })
    .then(post => {
      return Post.deleteOne({ _id: id });
    })
    .then(res => {
      done();
    })
    .catch(err => {
      res.json(err);
    });
};

deleteComment = (id, done) => {
  Comment.deleteOne({ _id: id })
    .then(res => {
      done();
    })
    .catch(err => {
      console.log(err);
    });
};

// test create comment route
describe("Add a comment to a post", () => {
  it("it should add a comment to a post given the post id", done => {
    let postId = "";
    afterEach(done => {
      deletePost(postId, done);
    });
    Post.create(newPost)
      .then(post => {
        chai
          .request(app)
          .post(`/api/posts/${post._id}/comments`)
          .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
          .field("comment", "this is a test comment")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("postId");
            res.body.should.have.property("comment");
            Comment.deleteOne({ _id: res.body.comment._id })
              .then(res => {})
              .catch(err => {
                console.log(err);
              });
            done();
          });
        return (postId = post._id);
      })
      .catch(err => {
        console.log("Error creating post");
      });
  });
});

// test get comment for edit route
describe("Get a comment", () => {
  it("it should get a comment given a post and comment id", done => {
    let commentId = "";

    afterEach(done => {
      deleteComment(commentId, done);
    });

    Comment.create(newComment)
      .then(comment => {
        chai
          .request(app)
          .get(`/api/posts/1/comments/${comment._id}/edit`)
          .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("comment")
              .eql("this is a test comment");
            done();
          });
        return (commentId = comment._id);
      })
      .catch(err => {
        console.log("Error creating post");
      });
  });
});

// test edit comment route
describe("Edit a comment", () => {
  it("it should edit a comment given a post and comment id", done => {
    let commentId = "";

    afterEach(done => {
      deleteComment(commentId, done);
    });

    Comment.create(newComment)
      .then(comment => {
        chai
          .request(app)
          .put(`/api/posts/1/comments/${comment._id}`)
          .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
          .send({ comment: "edited comment" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Successfully edited your comment!");
            res.body.should.have.property("comment").eql("edited comment");
            done();
          });
        return (commentId = comment._id);
      })
      .catch(err => {
        console.log(err);
      });
  });
});

// test delete comment route
describe("Delete a comment", () => {
  it("it should delete a comment given a post and comment id", done => {
    let postId = "";

    afterEach(done => {
      deletePost(postId, done);
    });

    Post.create(newPost)
      .then(post => {
        return (postId = post._id);
      })
      .then(res => {
        return Comment.create(newComment);
      })
      .then(comment => {
        chai
          .request(app)
          .delete(`/api/posts/${postId}/comments/${comment._id}`)
          .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Deleted your comment");
            done();
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
});
