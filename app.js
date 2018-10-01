require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const passport = require("./passport");
const auth = require("./routes/auth");
const routes = require("./routes/");

const app = express();
const router = express.Router();

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.DATABASEURL,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on("error", err => {
  console.log("Couldn't connect to db");
  console.log(err);
});
db.once("open", () => {
  console.log("Successfully connected to mongo db");
});

routes(router);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());

// passport
// app.use(
//   session({
//     secret: "shibas",
//     resave: false,
//     saveUninitialized: false
//   })
// );
app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/auth", auth);
app.use("/api", passport.authenticate("jwt", { session: false }), router);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
