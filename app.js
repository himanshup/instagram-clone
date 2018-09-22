require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dbConnection = require("./db");
const passport = require("./passport");
const routes = require("./routes/");

const app = express();
const router = express.Router();

const port = process.env.PORT || 5000;

routes(router);
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(helmet());

// passport
app.use(
  session({
    secret: "shibas",
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

app.listen(port, () => console.log(`Listening on port ${port}`));
