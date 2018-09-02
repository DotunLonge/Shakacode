"use strict";

var { verifyToken, adminOnly } = require("./middleware");

module.exports = function(app) {
  let user_controller = require("../controllers/user");

  app.route("/api/user/signup").post(user_controller.signup);
  app.route("/api/user/signin").post(user_controller.signin);
  app.route("/api/user/verify").post(verifyToken, user_controller.verify);

  app.route("/api/users?").get(adminOnly, user_controller.get_all);

  app
    .route("/api/users/:id?")
    .get(adminOnly, user_controller.get)
    .put(adminOnly, user_controller.update)
    .delete(adminOnly, user_controller.delete);
};
