/* eslint-disable no-await-in-loop */
const dashboardModel = require("./dashboardModel");
const helperWrapper = require("../../helpers/wrapper");

module.exports = {
  getDetailChart: async (req, res) => {
    try {
      const { movieId, location, premier } = req.query;
      if (
        movieId === undefined ||
        location === undefined ||
        premier === undefined
      ) {
        return helperWrapper.response(
          res,
          400,
          `Parameter Tidak Boleh Ada Yang Kosong`,
          null
        );
      }
      const getData = await dashboardModel.getDetailChart(
        movieId,
        location,
        premier
      );

      return helperWrapper.response(res, 200, `Data Ditemukan`, getData);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad Request : ${error.message}`,
        null
      );
    }
  },
};
