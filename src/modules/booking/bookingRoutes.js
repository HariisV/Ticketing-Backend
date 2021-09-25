const express = require("express");
const bookingController = require("./bookingController");

const Router = express.Router();

Router.get("/", bookingController.getAllBooking);
Router.get("/Seat", bookingController.getAllBookingSeat);
Router.post("/", bookingController.postBooking);
Router.patch("/:id", bookingController.updateBooking);
Router.delete("/:id", bookingController.deleteBookingWithSeat);

module.exports = Router;
