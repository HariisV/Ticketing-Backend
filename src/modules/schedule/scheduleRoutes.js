const express = require("express");
const scheduleController = require("./scheduleController");

const Router = express.Router();

Router.get("/", scheduleController.getAllSchedule);
Router.get("/:id", scheduleController.getAllScheduleById);
Router.post("/", scheduleController.postSchedule);
Router.patch("/:id", scheduleController.updateSchedule);
Router.delete("/:id", scheduleController.deletedSchedule);

module.exports = Router;
