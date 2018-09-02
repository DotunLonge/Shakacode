var jwt = require("jsonwebtoken");
var { isExpired } = require("../helpers/date");

exports.adminOnly = (req, res, next) => {
  const token = req.headers["authorization"];
  if (typeof token !== undefined) {
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, function(err, user) {
      if (err) {
        return res.status(401).json({
          message: "Something's wrong with your token"
        });
      } else {
        req.token = token;

        if (isExpired(user.expirationDate) === false) {
          if (user.isAdmin) {
            next();
          } else {
            return res.status(401).json({
              message: "You are not an admin"
            });
          }
        } else {
          return res.status(401).json({
            message: "Your Token Has Expired. Please Login"
          });
        }
      }
    });
  } else {
    res.status(400).json({
      message: "No Token Provided"
    });
  }
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (typeof token !== undefined) {
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, function(err, user) {
      if (err) {
        return res.status(400).json({
          message: "Something's wrong with your token"
        });
      } else {
        if (isExpired(user.expirationDate) === false) {
          req.token = token;
          req.email = user.email;
          req.isAdmin = user.isAdmin;
          next();
        } else {
          return res.status(401).json({
            message: "Your Token Has Expired. Please Login"
          });
        }
      }
    });
  } else {
    res.status(400).json({
      message: "No Token Provided"
    });
  }
};

exports.generalError = function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
};

exports.pageNotFound = function(req, res, next) {
  var err = new Error("File Not Found");
  err.status = 404;
  next(err);
};
