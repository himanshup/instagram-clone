const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");
const User = require("../models/user");
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

    cloudinary.v2.uploader.upload(
      req.file.path,
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
          description: caption ? caption : "",
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
      .populate("likes")
      .then(post => {
        if (post) {
          res.json(post);
        }
      })
      .catch(err => {
        res.json(err);
      });
  });

  // update post
  router.put("/posts/:post_id", upload.single("file"), (req, res) => {
    const caption = req.body.caption ? req.body.caption : "";
    Post.findByIdAndUpdate(req.params.post_id, { description: caption }).then(
      async post => {
        if (req.file) {
          try {
            await cloudinary.v2.uploader.destroy(post.imageId);
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
              width: 1000,
              height: 1000,
              crop: "scale"
            });
            post.imageId = result.public_id;
            post.image = result.secure_url;
          } catch (err) {
            return res.json(err);
          }
        }
        post.save();
        res.json(post);
      }
    );
  });

  // delete a post
  router.delete("/posts/:post_id", (req, res) => {
    Post.findById(req.params.post_id)
      .then(async post => {
        await Comment.remove({ _id: { $in: post.comments } });
        await Like.remove({ _id: { $in: post.likes } });
        return post;
      })
      .then(async post => {
        try {
          await cloudinary.v2.uploader.destroy(post.imageId);
          post.remove();
          return res.json({ message: "Successfully deleted your post!" });
        } catch (err) {
          if (err) {
            return res.json({ message: "Error deleting your post" });
          }
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
        return Post.findById(post._id)
          .populate("comments")
          .populate("likes");
      })
      .then(newPost => {
        res.json(newPost);
      })
      .catch(err => {
        res.json(err);
      });
  });
};
