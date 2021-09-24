const express = require("express");
const bookingController = require("./bookingController");

const Router = express.Router();

Router.get("/", bookingController.getAllBooking);
// Router.get("/:id", scheduleController.getAllScheduleById);
Router.get("/Seat", bookingController.getAllBookingSeat);
Router.post("/", bookingController.postBooking);
// Router.patch("/:id", scheduleController.updateSchedule);
// Router.delete("/:id", scheduleController.deletedSchedule);

module.exports = Router;
