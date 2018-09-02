"use strict";
require("dotenv").config();
// Schema Registration
require("./models/user");
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var logger = require("morgan");
var port = process.env.PORT || 7070;

var { pageNotFound, generalError } = require("./routes/middleware");

var app = express();

app.use(cors());

var http = require("http").Server(app);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (app.get("env") === "production") {
  app.use(function(req, res, next) {
    var protocol = req.get("x-forwarded-proto");
    protocol == "https"
      ? next()
      : res.redirect("https://" + req.hostname + req.url);
  });
}

var connectWithRetry = function() {
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      reconnectTries: 9999999999,
      connectTimeoutMS: 2000
    }
  );
};

mongoose.connection.on("error", function(err) {
  console.log("Error Occured");
  connectWithRetry();
});

mongoose.connection.on("connected", function(err) {
  console.log("Successfully Connected");
});

connectWithRetry();

require("./routes")(app);

// catch 404 and forward to error handler
app.use(pageNotFound);
// error handler
app.use(generalError);

// 8. Start the servers
http.listen(port, function() {
  console.log("listening on port " + port);
});
