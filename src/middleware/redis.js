/* eslint-disable no-console */
const redis = require("../config/redis");
const helperWrapper = require("../helpers/wrapper");

module.exports = {
  getMovieByIdRedis: (req, res, next) => {
    const { id } = req.params;
    redis.get(`getMovie:${id}`, (error, result) => {
      // result = [{"id":3,"name":"Batman","category":"Action","releaseDate":"2021-02-01T17:00:00.000Z","synopsis":"Lorem ipsum ...","createdAt":"2021-09-20T08:37:09.000Z","updatedAt":"2021-09-21T08:47:13.000Z"}]
      if (!error && result !== null) {
        console.log("data ada di dalam redis");
        const newResult = JSON.parse(result);
        return helperWrapper.response(
          res,
          200,
          "Success get data by id",
          newResult
        );
      }
      console.log("data tidak ada di dalam redis");
      return next();
    });
  },
  getMovieRedis: (req, res, next) => {
    redis.get(`getMovie:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result !== null) {
        console.log("data ada di dalam redis");
        const newResult = JSON.parse(result); // {result, pageInfo}
        return helperWrapper.response(
          res,
          200,
          "Success get data",
          newResult.result,
          newResult.pageInfo
        );
      }
      console.log("data tidak ada di dalam redis");
      return next();
    });
  },
  clearMovieRedis: (req, res, next) => {
    redis.keys("getMovie:*", (error, result) => {
      console.log(result.length);
      if (result.length > 0) {
        result.forEach((item) => {
          redis.del(item);
        });
      }
    });
    return next();
  },
  getScheduleRedis: (req, res, next) => {
    redis.get(
      `getSchedule:${JSON.stringify(req.query)}`,
      // eslint-disable-next-line consistent-return
      (error, result) => {
        if (!error && result !== null) {
          console.log("data ada didalam redis");
          const newResult = JSON.parse(result);

          return helperWrapper.response(
            res,
            200,
            "Success get schedule",
            newResult.result,
            newResult.pageInfo
          );
        }
        console.log("data tidak ada di dalam redis");
        next();
      }
    );
  },
  getScheduleByIdRedis: (req, res, next) => {
    const { id } = req.params;
    // eslint-disable-next-line consistent-return
    redis.get(`getSchedule:${id}`, (error, result) => {
      if (!error && result !== null) {
        console.log("data ada di dalam redis");
        const newResult = JSON.parse(result);

        return helperWrapper.response(
          res,
          200,
          "Success get single schedule",
          newResult
        );
      }
      console.log("data tidak ada di dalam redis");
      next();
    });
  },
  getScheduleByFilterRedis: (req, res, next) => {
    const { id } = req.params;
    // eslint-disable-next-line consistent-return
    redis.get(`getSchedule:${id}`, (error, result) => {
      if (!error && result !== null) {
        console.log("data ada di dalam redis");
        const newResult = JSON.parse(result);

        return helperWrapper.response(
          res,
          200,
          "Success get single schedule",
          newResult
        );
      }
      console.log("data tidak ada di dalam redis");
      next();
    });
  },
  getMovieRedisUpcoming: (req, res, next) => {
    // eslint-disable-next-line consistent-return
    redis.get(`getMovieUpcoming`, (error, result) => {
      if (!error && result !== null) {
        console.log("data ada di dalam redis");
        const newResult = JSON.parse(result);

        return helperWrapper.response(
          res,
          200,
          "Success get single schedule",
          newResult
        );
      }
      console.log("data tidak ada di dalam redis");
      next();
    });
  },

  clearScheduleRedis: (req, res, next) => {
    redis.keys("getSchedule:*", (error, result) => {
      if (result.length > 0) {
        result.forEach((item) => redis.del(item));
      }
      next();
    });
  },
  getCity: (req, res, next) => {
    redis.get("city:", (err, result) => {
      if (!err && result !== null) {
        console.log("DATA ADA DIDALAM REDIST");
        const newRest = JSON.parse(result);

        return helperWrapper.response(
          res,
          200,
          "Success Get City Redis",
          newRest
        );
      }
      console.log("DATA CITY TIDAK ADA DI REDIS");
      return next();
    });
  },
};
