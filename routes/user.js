const User = require("../models/user");
const Post = require("../models/post");
const multer = require("multer");
const cloudinary = require("cloudinary");
const middleware = require("../middleware");

const { checkProfileOwnership } = middleware;

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
  // get user for user profile
  router.get("/users/:user_id", (req, res) => {
    let newUser = {};
    User.findOne({ _id: req.params.user_id })
      .populate("followers")
      .populate("following")
      .populate("bookmarks")
      .then(user => {
        return (newUser = user);
      })
      .then(user => {
        return Post.find()
          .sort({ timePosted: -1 })
          .populate("comments")
          .populate("likes")
          .where("author.id")
          .equals(req.params.user_id);
      })
      .then(posts => {
        res.json({ posts: posts, user: newUser });
      })
      .catch(err => {
        res.json(err);
      });
  });

  // update user profile
  router.put(
    "/users/:user_id",
    upload.single("file"),
    checkProfileOwnership,
    (req, res) => {
      const name = req.body.name ? req.body.name : "";
      const bio = req.body.bio ? req.body.bio : "";
      User.findOneAndUpdate(
        { _id: req.params.user_id },
        { name: name, bio: bio }
      )
        .then(async user => {
          if (req.file) {
            await cloudinary.v2.uploader.destroy(user.avatarId);
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
              width: 150,
              height: 150,
              gravity: "center",
              crop: "fill"
            });
            user.avatarId = result.public_id;
            user.avatar = result.secure_url;
          }
          user.save();
          res.json({ message: "Updated your profile" });
        })
        .catch(err => {
          res.json({ message: "Error updating your profile" });
        });
    }
  );

  // follow a user
  router.post("/users/follow/:user_id", (req, res) => {
    User.findOne({ _id: req.params.user_id })
      .then(async user => {
        let currentUser = await User.findOne({ _id: req.user._id });
        user.followers.push(req.user._id);
        user.save();
        currentUser.following.push(user._id);
        currentUser.save();
        const data = {
          _id: req.user._id,
          username: req.user.username,
          avatar: currentUser.avatar
        };
        console.log(data);
        res.json(data);
      })
      .catch(err => {
        res.json({ message: "Error occured" });
      });
  });

  // unfollow user
  router.delete("/users/follow/:user_id", (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.user_id },
      {
        $pull: { followers: { $in: req.user._id } }
      }
    )
      .then(user => {
        return User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $pull: { following: { $in: [req.params.user_id] } }
          }
        );
      })
      .then(response => {
        return User.findOne({ _id: req.params.user_id })
          .populate("followers")
          .populate("following")
          .populate("posts");
      })
      .then(user => {
        console.log(user);
        res.json(user);
      })
      .catch(err => {
        res.json({ message: "Error occured" });
      });
  });
};
