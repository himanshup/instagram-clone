const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const multer = require("multer");
const cloudinary = require("cloudinary");

const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

const upload = multer({
  storage: storage
});

cloudinary.config({
  cloud_name: "dmrien29n",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

router.post("/post", upload.single("file"), (req, res) => {
  console.log(req.file);
  const file = req.file.path;

  cloudinary.v2.uploader.upload(file, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
  });
});

module.exports = router;
