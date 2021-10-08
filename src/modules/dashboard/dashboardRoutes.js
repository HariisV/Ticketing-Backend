const express = require("express");
const dashboardController = require("./dashboardController");
const middlewareAuth = require("../../middleware/auth");

const Router = express.Router();

Router.get(
  "/chart",
  middlewareAuth.authentication,
  middlewareAuth.isAdmin,
  dashboardController.getDetailChart
);

module.exports = Router;
