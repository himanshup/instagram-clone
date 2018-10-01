const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let MONGO_URL;

const MONGO_LOCAL_URL = "mongodb://localhost:27017/instagram";

if (process.env.MONGO_URI) {
  mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  );
  MONGO_URL = process.env.MONGO_URI;
} else {
  mongoose.connect(
    MONGO_LOCAL_URL,
    { useNewUrlParser: true }
  );
  MONGO_URL = MONGO_LOCAL_URL;
}

const db = mongoose.connection;
db.on("error", err => {
  console.log("couldn't connect to db");
  console.log(err);
});
db.once("open", () => {
  console.log("Successfully connected to mongo db");
});

module.exports = db;
