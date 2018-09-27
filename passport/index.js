const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const User = require("../models/user");

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  done(null, { _id: user._id });
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, "username")
    .select("+password")
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(null, err);
    });
});

passport.use(LocalStrategy);

module.exports = passport;
