const Post = require("../models/post");
const User = require("../models/user");
const fs = require("fs");
const cloudinary = require("cloudinary");

module.exports = {
  registerUser: (req, res) => {
    console.log("user signup");
    console.log(req.body);
    let { username, password } = req.body;

    User.findOne({ username: username }, (err, user) => {
      if (err) {
        console.log("user.js post err", err);
      } else if (user) {
        res.json({
          error: `Sorry, already a user with the username: ${username}`
        });
      } else {
        const newUser = new User({
          username: username,
          password: password
        });
        newUser.save((err, savedUser) => {
          if (err) {
            return res.json(err);
          }
          res.json(savedUser);
        });
      }
    });
  },

  authUser: (req, res, next) => {
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body);
    next();
  },

  loggedIn: (req, res) => {
    console.log("logged in", req.user);
    let userInfo = {
      username: req.user.username
    };
    res.send(userInfo);
  }
};
