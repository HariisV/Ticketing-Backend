const express = require("express");

const Router = express.Router();
const middlewareAuth = require("../../middleware/auth");
const middlewareRedis = require("../../middleware/redis");
const user = require("./userController");
const middlewareImageUser = require("../../middleware/ImageUser");

Router.post(
  "/update/password",
  middlewareAuth.authentication,
  user.updatePassword
);
Router.patch(
  "/update/profile",
  middlewareAuth.authentication,
  user.updateProfile
);
Router.patch(
  "/update/image",
  middlewareAuth.authentication,
  middlewareImageUser,
  user.updateImage
);
Router.post("/detail/:id", user.detailUserById);
Router.get("/city", middlewareRedis.getCity, user.getCity);

module.exports = Router;
