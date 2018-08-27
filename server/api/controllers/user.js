"use strict";
require("dotenv").config();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var mongoose = require("mongoose"),
  User = mongoose.model("User");

exports.signup = function(req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    return res.status(400).json({
      error: "Passwords do not match"
    });
  }

  var userData = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  };

  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) return res.status(400).json(err);

    userData.password = hash;

    User.create(userData, function(error, user) {
      const token = jwt.sign({ user }, process.env.JWT_TOKEN_SECRET);

      if (error) {
        if (
          error.message.includes("dup key") &&
          error.message.includes("username")
        ) {
          return res.status(400).json({
            message: "Username already in use"
          });
        } else if (
          error.message.includes("dup key") &&
          error.message.includes("email")
        ) {
          return res.status(400).json({
            message: "Email already in use"
          });
        } else {
          return res.status(400).json({
            message: error.message
          });
        }
      } else {
        return res.status(200).json({
          clientId: user.clientId,
          message: "Signed Up Successfully",
          jwtToken: token
        });
      }
    });
  });
};

exports.signin = function(req, res) {
  User.findOne({ email: req.body.email }).exec(function(error, user) {
    const token = jwt.sign({ user }, process.env.JWT_TOKEN_SECRET);

    if (error) {
      return res.status(400).json({
        error
      });
    } else if (!user) {
      return res.status(401).json({
        error: "User not found"
      });
    }

    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if (error) {
        return res.status(400).json({
          error
        });
      }

      if (result === true) {
        return res.status(200).json({
          clientId: user.clientId,
          username: user.username,
          email: user.email,
          publicAddress: user.publicAddress,
          message: "Login Successful",
          network: user.network,
          jwtToken: token
        });
      }
    });
  });
};
