"use strict";
module.exports = function(app) {
  let user_controller = require("../controllers/user");

  app.route("/signup").post(user_controller.signup);
  app.route("/signin").post(user_controller.signin);

  // app.route("/auto_signin").get(user_controller.auto_signin, ensureToken);
};

const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};
