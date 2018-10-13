const mongoose = require("mongoose");
const Post = require("../models/post");
const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const cloudinary = require("cloudinary");
const path = require("path");
const { readFileSync } = require("fs");
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

deletePost = (id, done) => {
  Post.deleteOne({
    _id: id
  })
    .then(res => {
      done();
    })
    .catch(err => {
      console.log(err);
    });
};

// test get all posts route
describe("Get all posts", () => {
  it("it should get all posts", done => {
    chai
      .request(app)
      .get("/api/posts")
      .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("posts");
        res.body.should.have.property("user");
        done();
      });
  });
});

// testing POST route to /posts
describe("Create a post", () => {
  it("it should create a new post", done => {
    chai
      .request(app)
      .post("/api/posts")
      .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
      .attach(
        "file",
        readFileSync(path.resolve(__dirname, "../extra/shiba.jpg")),
        "shiba.jpg"
      )
      .field("caption", "this is a test post")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("image");
        res.body.should.have.property("imageId");
        res.body.should.have.property("author");
        res.body.should.have.property("description");
        Post.deleteOne({
          _id: res.body._id
        })
          .then(response => {
            cloudinary.v2.uploader.destroy(res.body.imageId);
          })
          .then(response => {
            done();
          })
          .catch(err => {
            console.log(err);
          });
      });
  });
});

// test get post by id route
describe("Get a post", () => {
  it("it should get a post by the given id", done => {
    let postId = "";
    afterEach(done => {
      deletePost(postId, done);
    });
    Post.create(newPost)
      .then(post => {
        chai
          .request(app)
          .get(`/api/posts/${post._id}`)
          .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("image");
            res.body.should.have.property("author");
            res.body.should.have.property("_id").eql(post.id);
            done();
          });
        return (postId = post._id);
      })
      .catch(err => {
        console.log("Error creating post");
      });
  });
});

// test edit post route
describe("Update a post", () => {
  it("it should update a post given the id", done => {
    let postId = "";
    afterEach(done => {
      deletePost(postId, done);
    });
    Post.create(newPost)
      .then(post => {
        chai
          .request(app)
          .put(`/api/posts/${post._id}`)
          .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
          .send({ caption: "edited caption" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Updated post");
            done();
          });
        return (postId = post._id);
      })
      .catch(err => {
        console.log("Error creating post");
      });
  });
});

// test delete route
describe("Delete post", () => {
  it("it should delete a post given the id", done => {
    Post.create(newPost)
      .then(post => {
        chai
          .request(app)
          .delete(`/api/posts/${post._id}`)
          .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Deleted post");
            done();
          });
      })
      .catch(err => {
        console.log("Error creating post");
      });
  });
});

// test like post route
describe("Like a post", () => {
  it("it should like a post given the post id", done => {
    let postId = "";
    afterEach(done => {
      deletePost(postId, done);
    });
    Post.create(newPost)
      .then(post => {
        chai
          .request(app)
          .post(`/api/posts/${post._id}/likes`)
          .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("postId");
            res.body.should.have.property("like");
            done();
          });
        return (postId = post._id);
      })
      .catch(err => {
        console.log("Error creating post");
      });
  });
});

// test unlike post route
describe("Unlike a post", () => {
  it("it should unlike a post given the post id", done => {
    let postId = "";
    afterEach(done => {
      deletePost(postId, done);
    });
    Post.create(newPost)
      .then(post => {
        post.likes.push("5bb1dc87e6e8262e68bf770c");
        post.save();
        chai
          .request(app)
          .delete(`/api/posts/${post._id}/likes/5bb1dc87e6e8262e68bf770c`)
          .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Unliked!");
            done();
          });
        return (postId = post._id);
      })
      .catch(err => {
        console.log("Error creating post");
      });
  });
});
