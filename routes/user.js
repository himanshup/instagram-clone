const User = require("../models/user");
const passport = require("../passport");
const multer = require("multer");
const cloudinary = require("cloudinary");

const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

const imageFilter = function(req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter
});

cloudinary.config({
  cloud_name: "dmrien29n",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports = router => {
  router.post("/register", upload.single("file"), (req, res) => {
    const { username, password } = req.body;

    console.log("user signup");
    if (req.file) {
      const file = req.file.path;

      cloudinary.v2.uploader.upload(
        file,
        {
          width: 150,
          height: 150,
          gravity: "center",
          crop: "scale"
        },
        (error, result) => {
          if (error) {
            res.json(error);
          } else {
            const public_id = result.public_id;
            const secure_url = result.secure_url;
            User.findOne({ username: username })
              .then(user => {
                if (user) {
                  return res.json({
                    error: "Username taken"
                  });
                }
                const newUser = new User({
                  username: username,
                  password: password,
                  avatar: secure_url,
                  avatarId: public_id
                });
                newUser.save((err, savedUser) => {
                  if (err) return res.json(err);
                  res.json(savedUser);
                });
              })
              .catch(err => {
                res.json(err);
              });
          }
        }
      );
    } else {
      User.findOne({ username: username })
        .then(user => {
          if (user) {
            return res.json({ error: "Username taken" });
          }
          const newUser = new User({
            username: username,
            password: password,
            avatar:
              "https://scontent-lax3-1.cdninstagram.com/vp/74d4a001973ffb1c519909dc584b0316/5C328D7A/t51.2885-19/11906329_960233084022564_1448528159_a.jpg"
          });
          newUser.save((err, savedUser) => {
            if (err) return res.json(err);
            res.json(savedUser);
          });
        })
        .catch(err => {
          res.json(err);
        });
    }
  });

  router.get("/user", (req, res) => {
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.json({ user: null });
    }
  });

  router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ message: info.message });
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        const userInfo = {
          id: req.user._id,
          username: req.user.username,
          avatar: req.user.avatar
        };
        return res.json(userInfo);
      });
    })(req, res, next);
  });

  router.get("/users/:user_id", (req, res) => {
    User.findOne({ _id: req.params.user_id })
      .then(user => {
        if (user) {
          const userInfo = {
            id: user._id,
            avatar: user.avatar,
            avatarId: user.avatarId,
            name: user.name,
            bio: user.bio,
            bookmarks: user.bookmarks,
            followers: user.followers,
            following: user.following,
            username: user.username
          };
          res.json(userInfo);
        }
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.post("/logout", (req, res) => {
    req.logout();
    res.json({ msg: "logging out" });
  });
};
