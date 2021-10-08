/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();
const jwt = require("jsonwebtoken");
const helperWrapper = require("../helpers/wrapper");
const redis = require("../config/redis");

module.exports = {
  authentication: (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
      return helperWrapper.response(res, 403, "Please Login First");
    }
    token = token.split(" ")[1];
    redis.get(`accessToken:${token}`, (error, result) => {
      if (!error && result !== null) {
        return helperWrapper.response(
          res,
          403,
          "Your token is destroyed please login again"
        );
      }
    });
    jwt.verify(token, process.env.JWT_PRIVATE, (error, result) => {
      if (error) {
        return helperWrapper.response(res, 403, error.message);
      }
      req.decodeToken = result;
      return next();
    });
  },
  isAdmin: (req, res, next) => {
    const token = req.decodeToken;
    if (token.role !== "admin") {
      return helperWrapper.response(
        res,
        403,
        "You Dont Have Access To This Page"
      );
    }
    return next();
  },
};
