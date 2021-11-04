/* eslint-disable prefer-const */
const movieModel = require("./movieModel");
const helperWrapper = require("../../helpers/wrapper");
const deleteFile = require("../../helpers/delete");
const redis = require("../../config/redis");

module.exports = {
  getAllMovie: async (req, res) => {
    try {
      let { page, limit, name, sort, sortType } = req.query;
      name = name == null ? `%` : `%${name}%`;
      page = Number(page || 1);
      limit = Number(limit || 3);
      sortType = sortType || "DESC";
      sort = sort || "releaseDate";
      const offset = page * limit - limit;
      const totalData = await movieModel.getCountMovie(name);
      const totalPage = Math.ceil(totalData / limit);

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };
      const result = await movieModel.getAllMovie(
        limit,
        offset,
        name,
        sort,
        sortType
      );
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
      redis.setex(
        `getMovie:${JSON.stringify(req.query)}`,
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
  getMovieUpcoming: async (req, res) => {
    try {
      const date = new Date();
      const dateNow = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      const result = await movieModel.getMovieUpcoming(dateNow);
      if (result.length < 1) {
        return helperWrapper.response(res, 404, `Data Tidak Ditemukan`, null);
      }
      redis.setex(`getMovieUpcoming`, 3600, JSON.stringify(result));

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
  getMovieUpcomingFilter: async (req, res) => {
    try {
      const { month } = req.body;
      const date = new Date();
      const dateNow = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      const result = await movieModel.getMovieUpcomingFilter(dateNow, month);
      if (result.length < 1) {
        return helperWrapper.response(res, 400, `Data Tidak Ditemukan`, null);
      }
      // redis.setex(`getMovieUpcoming`, 3600, JSON.stringify(result));
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
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await movieModel.getMovieById(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          200,
          `dataById ${id} Not Found`,
          null
        );
      }
      redis.setex(`getMovie:${id}`, 3600, JSON.stringify(result));

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
  postMovie: async (req, res) => {
    try {
      let isNull;
      const {
        name,
        category,
        releaseDate,
        sypnosis,
        cast,
        director,
        duration,
      } = req.body;
      const setData = {
        name,
        category,
        releaseDate,
        sypnosis,
        cast,
        director,
        duration,
        image: req.file ? req.file.filename : null,
      };
      Object.keys(setData).forEach((element) => {
        if (!setData[element]) {
          isNull = element;
        }
      });
      if (isNull) {
        return helperWrapper.response(
          res,
          400,
          `${isNull} tidak boleh kosong`,
          null
        );
      }
      const result = await movieModel.postMovie(setData);
      return helperWrapper.response(res, 200, "Created Succes !", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad Request : ${error.message}`,
        null
      );
    }
  },
  updateMovie: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await movieModel.getMovieById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data Dengan Id : ${id} Not Found`,
          null
        );
      }
      const {
        name,
        category,
        releaseDate,
        sypnosis,
        cast,
        director,
        duration,
      } = req.body;
      const setData = {
        name,
        category,
        releaseDate,
        sypnosis,
        cast,
        director,
        duration,
        updatedAt: new Date(Date.now()),
      };
      Object.keys(setData).forEach((element) => {
        if (!setData[element]) {
          delete setData[element];
        }
      });
      if (req.file && checkId[0].image) {
        setData.image = req.file.filename;
        deleteFile(`public/uploads/movie/${checkId[0].image}`);
      }
      const result = await movieModel.updateMovie(setData, id);
      return helperWrapper.response(res, 200, "Success Update Data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad Request : ${error.message}`,
        null
      );
    }
  },
  deletedMovie: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await movieModel.getMovieById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          200,
          `dataById ${id} Not Found`,
          null
        );
      }
      if (checkId[0].image) {
        deleteFile(`public/uploads/movie/${checkId[0].image}`);
      }
      const result = await movieModel.deleteMovie(id);
      return helperWrapper.response(
        res,
        200,
        `Succes Deleted Movie Id: ${id}`,
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
};
