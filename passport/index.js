const User = require("../db/models/user");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;

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

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    function(username, password, cb) {
      return User.findOne({ username: username })
        .select("+password")
        .then(user => {
          if (!user) {
            return cb(null, false, {
              message: "Incorrect username or password."
            });
          }
          return cb(null, user, {
            message: "Logged In Successfully"
          });
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    function(jwtPayload, cb) {
      return User.findOne({ _id: jwtPayload._id })
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);

module.exports = passport;
