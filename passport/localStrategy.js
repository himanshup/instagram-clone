const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: "username"
  },
  function(username, password, done) {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        console.log;
      }
      if (!user) {
        return done(null, false, {
          message: "Account with username doesn't exist"
        });
      }
      if (!user.checkPassword(password)) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    });
  }
);

module.exports = strategy;
