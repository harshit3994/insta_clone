require("dotenv").config();
const express = require("express");
const path = require("path");
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

if (process.env.NODE_ENV === "test") {
  mongoose.connect(
    `mongodb://localhost:27017/instagram-test`,
    { useNewUrlParser: true }
  );
} else {
  mongoose.connect(
    process.env.DATABASEURL,
    { useNewUrlParser: true }
  );
}

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
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

module.exports = app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
