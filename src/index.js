// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const routerNavigation = require("./routes");

const app = express();
const port = process.env.APP_PORT;

app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());
app.use(xss());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", routerNavigation);
app.use("/*", (request, response) => {
  response.status(404).send("Path Not Found !");
});

// app.get("/", (req, res) => {
//   res.status(200);
//   res.send("Hallo World s!");
// });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express App Listen On Port : ${port}`);
});
