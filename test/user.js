const User = require("../models/user");
const Post = require("../models/post");
const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

// test get user route
describe("Get a user", () => {
  it("it should get a user given an id", done => {
    chai
      .request(app)
      .get("/api/users/5bb1dc87e6e8262e68bf770c")
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

// test update user route
describe("Update user profile", () => {
  it("it should update a user profile given an id", done => {
    chai
      .request(app)
      .put("/api/users/5bb1dc87e6e8262e68bf770c")
      .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
      .send({ name: "Bobby", bio: "Edited bio" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Updated your profile");
        done();
      });
  });
});

// test follower user route
describe("Follow a user", () => {
  it("it should follow a user given a user id", done => {
    chai
      .request(app)
      .post("/api/users/5bb1f770d95264390b7ac35d/follow")
      .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("_id");
        res.body.should.have.property("username");
        res.body.should.have.property("avatar");
        done();
      });
  });
});

// test unfollow user route
describe("Unfollow a user", () => {
  it("it should unfollow a user given a user id", done => {
    chai
      .request(app)
      .delete("/api/users/5bb1f770d95264390b7ac35d/follow")
      .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
