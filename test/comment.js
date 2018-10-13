const Post = require("../models/post");
const Comment = require("../models/comment");
const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

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
  let postId = "";

  after(done => {
    deletePost(postId, done);
  });

  it("it should add a comment to a post given the post id", done => {
    const newPost = {
      image:
        "https://happytoutou.wamiz.com/wp-content/uploads/2017/04/voici-ryuji-le-shiba-inu-06.jpg",
      description: "this is a caption",
      author: {
        id: process.env.USER_ID,
        username: process.env.USERNAME
      }
    };
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

describe("STARTING GET/EDIT/DELETE COMMENT TESTS...", () => {
  let testComment = {};
  let postId = "";

  before(done => {
    const newPost = {
      image:
        "https://happytoutou.wamiz.com/wp-content/uploads/2017/04/voici-ryuji-le-shiba-inu-06.jpg",
      description: "this is a caption",
      author: {
        id: process.env.USER_ID,
        username: process.env.USERNAME
      }
    };

    Post.create(newPost)
      .then(post => {
        return (postId = post._id);
      })
      .then(res => {
        return Comment.create({
          text: "this is a test comment",
          author: {
            id: process.env.USER_ID,
            username: process.env.USERNAME
          }
        });
      })
      .then(comment => {
        return (testComment = comment);
      })
      .then(res => {
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });

  after(done => {
    Comment.deleteOne({ _id: testComment._id })
      .then(res => {
        deletePost(postId, done);
      })
      .catch(err => {
        console.log(err);
      });
  });

  // test get comment for edit route
  describe("Get a comment", () => {
    it("it should get a comment given a post and comment id", done => {
      chai
        .request(app)
        .get(`/api/posts/1/comments/${testComment._id}/edit`)
        .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("comment")
            .eql("this is a test comment");
          done();
        });
    });
  });

  // test edit comment route
  describe("Edit a comment", () => {
    it("it should edit a comment given a post and comment id", done => {
      chai
        .request(app)
        .put(`/api/posts/1/comments/${testComment._id}`)
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
    });
  });

  // test delete comment route
  describe("Delete a comment", () => {
    it("it should delete a comment given a post and comment id", done => {
      chai
        .request(app)
        .delete(`/api/posts/${postId}/comments/${testComment._id}`)
        .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Deleted your comment");
          done();
        });
    });
  });
});
