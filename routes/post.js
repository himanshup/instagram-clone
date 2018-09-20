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
  router.post("/post", upload.single("file"), (req, res) => {
    if (req.file) {
      console.log(req.file);
      const file = req.file.path;
    }
    console.log(req.body);

    // cloudinary.v2.uploader.upload(file, (error, result) => {
    //   if (error) {
    //     res.send(error);
    //   } else {
    //     res.send(result);
    //   }
    // });
  });
};
