const express = require("express");
const movieController = require("./movieController");

const Router = express.Router();

Router.get("/", movieController.getAllMovie);
Router.get("/:id", movieController.getMovieById);
Router.post("/", movieController.postMovie);
Router.patch("/:id", movieController.updateMovie);
Router.delete("/:id", movieController.deletedMovie);
module.exports = Router;
