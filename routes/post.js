const Post = require("../models/post");
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
      .exec((err, posts) => {
        if (err) {
          return res.json(err);
        }
        res.json(posts);
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
      (error, result) => {
        if (error) {
          return res.json(error);
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
        Post.create(newPost, (err, post) => {
          if (err) {
            return res.json(err);
          }
          res.json(post);
        });
      }
    );
  });

  // get post by id
  router.get("/posts/:post_id", (req, res) => {
    Post.findById(req.params.post_id)
      .populate("comments")
      .exec((err, post) => {
        if (err || !post) {
          console.log(err);
          return res.json(err);
        }
        res.json(post);
      });
  });

  router.post("/posts/:post_id/like", (req, res) => {
    Post.findById(req.params.post_id)
      .populate("comments")
      .exec()
      .then(post => {});
  });

  // router.post("/posts/:post_id/comments", (req, res) => {
  //   let newComment = {};
  //   Post.findById(req.params.post_id)
  //     .exec()
  //     .then(post => {
  //       console.log(post);
  //     })
  //     .then(comment => {
  //       comment.author.id = req.user._id;
  //       comment.author.username = req.user.username;
  //       comment.save();
  //       return (newComment = comment);
  //     })
  //     .then(result => {
  //       return Post.findById(req.params.post_id)
  //         .populate("comments")
  //         .exec();
  //     })
  //     .then(post => {
  //       post.comments.push(newComment);
  //       post.save();
  //       return res.json(post);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // });
};
