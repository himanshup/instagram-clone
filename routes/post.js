const Post = require("../models/post");
const multer = require("multer");
const cloudinary = require("cloudinary");
const Like = require("../models/like");
const User = require("../models/user");

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
  // get all posts
  router.get("/posts", (req, res) => {
    Post.find({})
      .sort({ timePosted: -1 })
      .populate("comments")
      .populate("likes")
      .then(posts => {
        res.json(posts);
      })
      .catch(err => {
        res.json(err);
      });
  });
  // create new post
  router.post("/posts", upload.single("file"), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    const file = req.file.path;

    cloudinary.v2.uploader.upload(
      file,
      { width: 1000, height: 1000, crop: "scale" },
      (err, result) => {
        if (err) {
          return res.json(err);
        }
        const { caption, authorId, username, avatar } = req.body;
        const public_id = result.public_id;
        const secure_url = result.secure_url;
        const newPost = {
          image: secure_url,
          imageId: public_id,
          description: caption,
          author: {
            id: authorId,
            username: username,
            avatar: avatar
          }
        };
        Post.create(newPost)
          .then(post => {
            res.json(post);
          })
          .catch(err => {
            res.json(err);
          });
      }
    );
  });

  // get post by id
  router.get("/posts/:post_id", (req, res) => {
    Post.findById(req.params.post_id)
      .populate("comments")
      .then(post => {
        if (post) {
          res.json(post);
        }
      })
      .catch(err => {
        res.json(err);
      });
  });

  // like a post
  router.post("/posts/:post_id/likes", (req, res) => {
    let newLike = {};
    Post.findById(req.params.post_id)
      .exec()
      .then(post => {
        return User.findById(req.user._id);
      })
      .then(user => {
        return Like.create({
          author: {
            id: req.user._id,
            username: req.user.username
          },
          avatar: user.avatar
        });
      })
      .then(like => {
        return (newLike = like);
      })
      .then(result => {
        return Post.findById(req.params.post_id)
          .populate("likes")
          .populate("comments")
          .exec();
      })
      .then(post => {
        post.likes.push(newLike);
        post.save();
        res.json(post);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // dislike a post
  router.delete("/posts/:post_id/likes/:like_id", (req, res) => {
    Like.findByIdAndRemove(req.params.like_id)
      .then(response => {
        return Post.findByIdAndUpdate(req.params.post_id, {
          $pull: { likes: { $in: [req.params.like_id] } }
        });
      })
      .then(post => {
        return Post.findById(post._id);
      })
      .then(newPost => {
        res.json(newPost);
      })
      .catch(err => {
        res.json(err);
      });
  });
};
