process.env.NODE_ENV = "test";

const User = require("../models/user");
const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("Register", () => {
  it("it should register a user and return a 200 response", done => {
    afterEach(done => {
      User.deleteOne({ username: "test123" })
        .then(res => {
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
    const credentials = {
      username: "test123",
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

describe("Login", () => {
  it("it should log in and return a 200 response", done => {
    const credentials = {
      username: "bob",
      password: "1"
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
        done();
      });
  });
});
