const express = require("express");
const bookingController = require("./bookingController");
const middlewareAuth = require("../../middleware/auth");

const Router = express.Router();

Router.get(
  "/",
  middlewareAuth.authentication,
  middlewareAuth.isAdmin,
  bookingController.getAllBooking
);
// Router.get(
//   "/used-ticked/:id",
//   middlewareAuth.authentication,
//   middlewareAuth.isAdmin,
//   bookingController.usedTicked
// );
Router.get("/Seat", bookingController.getAllBookingSeat);
Router.post("/", middlewareAuth.authentication, bookingController.postBooking);
Router.patch(
  "/:id",
  middlewareAuth.authentication,
  bookingController.updateBooking
);
Router.delete(
  "/:id",
  middlewareAuth.authentication,
  bookingController.deleteBookingWithSeat
);
Router.post("/success/notify", bookingController.notifyMidtransBooking);
Router.get(
  "/export/ticket/:id",
  middlewareAuth.authentication,
  bookingController.exportTicket
);
module.exports = Router;
