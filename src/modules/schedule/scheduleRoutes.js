const express = require("express");
const scheduleController = require("./scheduleController");
const middlewareRedis = require("../../middleware/redis");

const Router = express.Router();
const authMiddleware = require("../../middleware/auth");

Router.get(
  "/",
  middlewareRedis.getScheduleRedis,
  scheduleController.getAllSchedule
);
Router.get(
  "/:id",
  middlewareRedis.getScheduleByIdRedis,
  scheduleController.getAllScheduleById
);
Router.post(
  "/",
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  middlewareRedis.clearScheduleRedis,
  scheduleController.postSchedule
);
Router.patch(
  "/:id",
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  middlewareRedis.clearScheduleRedis,
  scheduleController.updateSchedule
);
Router.delete(
  "/:id",
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  middlewareRedis.clearScheduleRedis,
  scheduleController.deletedSchedule
);

module.exports = Router;
