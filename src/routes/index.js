const express = require("express");

const Router = express.Router();
const MovieRoute = require("../modules/movie/movieRoutes");
const ScheduleRoute = require("../modules/schedule/scheduleRoutes");

Router.use("/movie", MovieRoute);
Router.use("/schedule", ScheduleRoute);
module.exports = Router;
