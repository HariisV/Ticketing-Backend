const express = require("express");

const Router = express.Router();
const MovieRoute = require("../modules/movie/movieRoutes");
const ScheduleRoute = require("../modules/schedule/scheduleRoutes");
const BookingRoute = require("../modules/booking/bookingRoutes");
const authRoute = require("../modules/auth/authRoutes");
const userRoute = require("../modules/user/userRoutes");
const dashbordRoute = require("../modules/dashboard/dashboardRoutes");

Router.use("/movie", MovieRoute);
Router.use("/schedule", ScheduleRoute);
Router.use("/booking", BookingRoute);
Router.use("/auth", authRoute);
Router.use("/user", userRoute);
Router.use("/dashboard", dashbordRoute);
module.exports = Router;
