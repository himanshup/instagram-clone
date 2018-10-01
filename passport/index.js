const User = require("../models/user");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.serializeUser((user, done) => {
  done(null, { _id: user._id });
});

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
      usernameField: "username"
    },
    function(username, password, done) {
      User.findOne({ username: username })
        .select("+password")
        .exec((err, user) => {
          if (err) {
            console.log(err);
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
