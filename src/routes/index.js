const express = require("express");

const Router = express.Router();
const MovieRoute = require("../modules/movie/movieRoutes");
const ScheduleRoute = require("../modules/schedule/scheduleRoutes");
const BookingRoute = require("../modules/booking/bookingRoutes");

Router.use("/movie", MovieRoute);
Router.use("/schedule", ScheduleRoute);
Router.use("/booking", BookingRoute);
module.exports = Router;
