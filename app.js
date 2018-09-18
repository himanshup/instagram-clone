require("dotenv").config();
const express = require("express");
const passport = require("./passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");
const app = express();
const url = process.env.MONGODB_URL || "mongodb://localhost:27017/instagram";
const user = require("./routes/user");
const post = require("./routes/post");
try {
  mongoose.connect(
    url,
    { useNewUrlParser: true }
  );
} catch (error) {
  console.log(error);
}

const port = process.env.PORT || 5000;
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

// passport
app.use(
  session({
    secret: "shibas are the best dog breed",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

app.use("/api", user);
app.use("/api", post);

app.listen(port, () => console.log(`Listening on port ${port}`));
