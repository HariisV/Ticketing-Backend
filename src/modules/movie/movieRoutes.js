const express = require("express");

const Router = express.Router();
const middlewareAuth = require("../../middleware/auth");
const movieController = require("./movieController");
const middlewareMovie = require("../../middleware/ImageMovie");
const middlewareRedis = require("../../middleware/redis");

Router.post(
  "/upcoming/",
  // middlewareRedis.getMovieByIdRedis,
  movieController.getMovieUpcomingFilter
);
Router.get("/", middlewareRedis.getMovieRedis, movieController.getAllMovie);
Router.get(
  "/upcoming",
  middlewareRedis.getMovieRedisUpcoming,
  movieController.getMovieUpcoming
);

Router.get(
  "/:id",
  middlewareRedis.getMovieByIdRedis,
  movieController.getMovieById
);
Router.post(
  "/",
  middlewareAuth.authentication,
  middlewareAuth.isAdmin,
  middlewareRedis.clearMovieRedis,
  middlewareMovie,
  movieController.postMovie
);
Router.patch(
  "/:id",
  middlewareAuth.authentication,
  middlewareAuth.isAdmin,
  middlewareRedis.clearMovieRedis,
  middlewareMovie,
  movieController.updateMovie
);
Router.delete(
  "/:id",
  middlewareAuth.authentication,
  middlewareAuth.isAdmin,
  middlewareRedis.clearMovieRedis,
  movieController.deletedMovie
);

module.exports = Router;
