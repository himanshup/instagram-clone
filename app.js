require("dotenv").config();
const express = require("express");
const routes = require("./routes/");
const passport = require("./passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");

const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;
const url = process.env.MONGODB_URL || "mongodb://localhost:27017/instagram";

try {
  mongoose.connect(
    url,
    { useNewUrlParser: true }
  );
} catch (error) {
  console.log(error);
}

routes(router);
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

app.use("/api", router);

app.listen(port, () => console.log(`Listening on port ${port}`));
