const express = require("express");

const Router = express.Router();
const middlewareAuth = require("../../middleware/auth");
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
Router.get("/detail/:id", middlewareAuth.authentication, user.detailUserById);

module.exports = Router;
