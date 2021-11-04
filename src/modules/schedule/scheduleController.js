const scheduleModel = require("./scheduleModel");
const helperWrapper = require("../../helpers/wrapper");
const redis = require("../../config/redis");

module.exports = {
  getAllSchedule: async (req, res) => {
    try {
      let { page, limit, movieID, location, sortType } = req.query;
      const sort = sortType == null ? "id" : "price";
      page = Number(page || 1);
      limit = Number(limit || 3);
      sortType = sortType || "DESC";
      location = location == null ? "%" : `%${location}%`;
      movieID = movieID == null ? "%" : `${movieID}`;
      const offset = page * limit - limit;
      const totalData = await scheduleModel.getCountSchedule(movieID, location);
      const totalPage = Math.ceil(totalData / limit);
      if (sortType !== "ASC" && sortType !== "DESC") {
        return helperWrapper.response(
          res,
          400,
          `Sorting Type Eror, Gunakan ASC Atau DESC `,
          null
        );
      }

      const result = await scheduleModel.getAllSchedule(
        limit,
        offset,
        movieID,
        location,
        sort,
        sortType
      );

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };

      if (result.length < 1) {
        return helperWrapper.response(res, 404, `Data Tidak Ditemukan`, null);
      }
      if (page > totalPage) {
        return helperWrapper.response(
          res,
          400,
          `Data Hanya Sampai Page Ke ${totalPage}`,
          null
        );
      }
      result.forEach((element, index) => {
        result[index].time = element.time.split(",");
      });
      redis.setex(
        `getSchedule:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result, pageInfo })
      );

      return helperWrapper.response(
        res,
        200,
        "success Get Data",
        result,
        pageInfo
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad Request : ${error.message}`,
        null
      );
    }
  },
  getAllScheduleById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await scheduleModel.getScheduleById(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Schedule ${id} Tidak Ditemukan`,
          null
        );
      }
      result[0].time = result[0].time.split(",");
      redis.setex(`getSchedule:${id}`, 3600, JSON.stringify(result));
      return helperWrapper.response(res, 200, "success Get Data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad Request : ${error.message}`,
        null
      );
    }
  },
  getScheduleByFilter: async (req, res) => {
    try {
      const { date, location, page, movieId } = req.body;
      const limit = 3;
      const offset = page * limit - limit;

      const result = await scheduleModel.getScheduleByFilter(
        date,
        location,
        offset,
        limit,
        movieId
      );
      const countData = await scheduleModel.getCountScheduleByFilter(
        date,
        location
      );
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Schedule Di ${location} Tidak Ditemukan`,
          null
        );
      }
      result.forEach((element, index) => {
        result[index].time = element.time.split(",");
      });

      const pageInfo = {
        page,
        totalPage: Math.ceil(countData / limit),
        limit,
        totalData: countData,
      };
      redis.setex(`getSchedule:${date}`, 3600, JSON.stringify(result));
      return helperWrapper.response(
        res,
        200,
        "success Get Data",
        result,
        pageInfo
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad Request : ${error.message}`,
        null
      );
    }
  },
  postSchedule: async (req, res) => {
    try {
      const { movieID, premier, price, location, dateStart, dateEnd, time } =
        req.body;
      let isNull;

      const setData = {
        movieID,
        premier,
        price,
        location,
        dateStart,
        dateEnd,
        time,
      };
      Object.keys(setData).forEach((el) => {
        if (setData[el] == null || setData[el] == "") {
          isNull = el;
        }
      });
      if (isNull) {
        return helperWrapper.response(
          res,
          400,
          `${isNull} Tidak Boleh Kosong`,
          null
        );
      }
      const result = await scheduleModel.postSchedule(setData);
      return helperWrapper.response(res, 200, "Success Create Data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad Request : ${error.message}`,
        null
      );
    }
  },
  updateSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const check = await scheduleModel.getScheduleById(id);
      if (check.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Schedule ${id} Tidak Ditemukan`,
          null
        );
      }

      const { movieID, premier, price, location, dateStart, dateEnd, time } =
        req.body;
      const setData = {
        movieID,
        premier,
        price,
        location,
        dateStart,
        dateEnd,
        time,
        updatedAt: new Date(Date.now()),
      };

      Object.keys(setData).forEach((el) => {
        if (setData[el] == null) {
          delete setData[el];
        }
      });

      const result = await scheduleModel.updateSchedule(id, setData);
      return helperWrapper.response(
        res,
        200,
        `Success Update Data For Id ${id}`,
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad Request : ${error.message}`,
        null
      );
    }
  },
  deletedSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const check = await scheduleModel.getScheduleById(id);
      if (check.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Schedule ${id} Tidak Ditemukan`,
          null
        );
      }
      await scheduleModel.deletedSchedule(id);
      return helperWrapper.response(
        res,
        200,
        `Success Deleted Data For Id ${id}`,
        null
      );
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
