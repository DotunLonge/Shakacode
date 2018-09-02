"use strict";
require("dotenv").config();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var { genExpDate } = require("../helpers/date");
var mongoose = require("mongoose"),
  User = mongoose.model("User");

exports.signup = function(req, res) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    return res.status(400).json({
      message: "Passwords do not match"
    });
  }

  var userData = req.body;

  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err)
      return res.status(400).json({
        message: err.message
      });
    // replace userData object password field with generated hash
    userData.password = hash;
    // store the user
    User.create(userData, function(error, user) {
      if (error) {
        if (
          error.message.includes("dup key") &&
          error.message.includes("email")
        ) {
          return res.status(400).json({
            message: "Email already in use"
          });
        }

        return res.status(400).json({
          message: error.message
        });
      } else {
        let signThis = {
          isAdmin: user.isAdmin,
          email: user.email,
          expirationDate: genExpDate()
        };

        // generate a token
        const token = jwt.sign(signThis, process.env.JWT_TOKEN_SECRET);

        return res.status(201).json({
          id: user._id,
          message: "Signed Up Successfully",
          token,
          isAdmin: user.isAdmin
        });
      }
    });
  });
};

exports.signin = function(req, res) {
  User.findOne({ email: req.body.email }).exec(function(error, user) {
    if (error) {
      return res.status(400).json({
        message: error.message
      });
    } else if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }
    // use bcrypt to compare passwords
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if (error) {
        return res.status(400).json({
          message: error.message
        });
      }
      if (result === true) {
        let signThis = {
          isAdmin: user.isAdmin,
          email: user.email,
          expirationDate: genExpDate()
        };

        // create user token
        const token = jwt.sign(signThis, process.env.JWT_TOKEN_SECRET);
        // return success respone
        return res.status(200).json({
          id: user._id,
          message: "Login Successful",
          token,
          isAdmin: user.isAdmin
        });
      } else {
        return res.status(400).json({
          message: "Password Incorrect"
        });
      }
    });
  });
};

exports.verify = async function(req, res) {
  try {
    // extract email from old token
    let user = await User.findOne({ email: req.email });

    // if user still exists proceed,else return no user found response.
    if (user !== null) {
      let signThis = {
        isAdmin: user.isAdmin,
        email: user.email,
        expirationDate: genExpDate()
      };

      // sign the token
      const token = jwt.sign(signThis, process.env.JWT_TOKEN_SECRET);

      // return success response
      return res.json({
        id: user._id,
        token,
        isAdmin: user.isAdmin,
        email: user.email
      });
    } else {
      return res.status(400).json({
        message: "No User Found"
      });
    }
  } catch (e) {
    return res.status(401).json({
      message: e.message
    });
  }
};

exports.get_all = function(req, res) {
  let limit = parseInt(req.query.limit ? req.query.limit : 0, 10);
  let page = req.query.page ? req.query.page : 1;

  let skip = parseInt(page * limit - limit, 10);

  let otherQueryParams = req.query;

  delete otherQueryParams.limit;
  delete otherQueryParams.page;

  User.find(otherQueryParams)
    .skip(skip)
    .limit(limit)
    .exec(function(err, users) {
      if (err) return res.status(400).json({ message: err.message });

      if (!users)
        return res.json({
          message: "No Users Found"
        });
      return res.json({
        users
      });
    });
};

exports.delete = function(req, res) {
  User.findOneAndRemove({ _id: req.params.id }, function(err, response) {
    if (err) return res.status(400).json({ message: err.message });
    if (response !== null) {
      return res.json({
        message: "Deleted Successfully"
      });
    } else {
      return res.status(400).json({
        message: "This user has been deleted or never existed."
      });
    }
  });
};

exports.update = function(req, res) {
  let body = req.body;

  bcrypt.hash(body.password, 10, function(err, hash) {
    if (err)
      return res.status(400).json({
        message: err.message
      });
    // replace userData object password field with generated hash
    body.password = hash;
    // store the user

    let updateObj = { $set: body };

    User.findOneAndUpdate(
      { _id: req.params.id },
      updateObj,
      { new: true },
      function(err, user) {
        if (err) return res.status(400).json({ message: err.message });
        return res.json({ user, message: "Updated Successfully" });
      }
    );
  });
};

exports.get = function(req, res) {
  User.findOne({ _id: req.params.id }, function(err, user) {
    if (err) return res.status(400).json({ message: err.message });
    return res.json({ user });
  });
};
