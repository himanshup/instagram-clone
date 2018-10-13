const User = require("../models/user");
const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("STARTING USER TESTS...", () => {
  let userForTest = {};

  before(done => {
    User.create({
      username: "test2",
      password: "password"
    })
      .then(user => {
        return (userForTest = user);
      })
      .then(res => {
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });

  after(done => {
    User.findOneAndRemove({ _id: process.env.USER_ID })
      .then(res => {
        return User.findOneAndRemove({ _id: userForTest._id });
      })
      .then(res => {
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });

  // test get user route
  describe("Get a user", () => {
    it("it should get a user given an id", done => {
      chai
        .request(app)
        .get(`/api/users/${process.env.USER_ID}`)
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
        .put(`/api/users/${process.env.USER_ID}`)
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
        .post(`/api/users/${userForTest._id}/follow`)
        .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("username");
          done();
        });
    });
  });

  // test unfollow user route
  describe("Unfollow a user", () => {
    it("it should unfollow a user given a user id", done => {
      chai
        .request(app)
        .delete(`/api/users/${userForTest._id}/follow`)
        .set("Authorization", `bearer ${process.env.JWT_TOKEN}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
