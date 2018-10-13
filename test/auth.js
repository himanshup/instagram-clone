process.env.NODE_ENV = "test";

const User = require("../models/user");
const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("Register a user", () => {
  after(done => {
    User.deleteOne({ username: "registerTest" })
      .then(res => {
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });
  it("it should register a user and return a 200 response", done => {
    const credentials = {
      username: "registerTest",
      password: "password"
    };
    chai
      .request(app)
      .post("/api/auth/register")
      .send(credentials)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql("Successfully registered");
        done();
      });
  });
});

describe("Login a user", () => {
  before(done => {
    User.create({
      username: "testAPI",
      password: "password"
    })
      .then(user => {
        process.env.USER_ID = user._id;
        process.env.USERNAME = user.username;
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });

  it("it should log in and return a 200 response", done => {
    const credentials = {
      username: "testAPI",
      password: "password"
    };
    chai
      .request(app)
      .post("/api/auth/login")
      .send(credentials)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("userInfo");
        res.body.should.have.property("token");
        process.env.JWT_TOKEN = res.body.token;
        done();
      });
  });
});
