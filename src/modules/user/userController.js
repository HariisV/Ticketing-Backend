const bcrypt = require("bcrypt");
const helperWrapper = require("../../helpers/wrapper");
const modelUser = require("./userModel");
const redis = require("../../config/redis");

const deleteFile = require("../../helpers/delete");

module.exports = {
  updatePassword: async (req, res) => {
    try {
      const { id } = req.decodeToken;
      const { newPassword, confirmPassword } = req.body;
      if (newPassword !== confirmPassword) {
        return helperWrapper.response(
          res,
          400,
          `New Password And Confirm Password Tidak Sama`,
          null
        );
      }
      const setData = {
        password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10)),
        updatedAt: new Date(Date.now()),
      };
      const result = await modelUser.updateProfile(setData, id);
      return helperWrapper.response(res, 200, "Success register user", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { id } = req.decodeToken;
      const { firstName, lastName, email, phoneNumber, password } = req.body;
      const setData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        updatedAt: new Date(Date.now()),
      };
      Object.keys(setData).forEach((element) => {
        if (!setData[element]) {
          delete setData[element];
        }
      });
      const result = await modelUser.updateProfile(setData, id);
      return helperWrapper.response(res, 200, "Success register user", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  detailUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await modelUser.getUserById(id);
      if (result[0] === undefined) {
        return helperWrapper.response(res, 404, "User Tidak Ditemukan", result);
      }
      return helperWrapper.response(
        res,
        200,
        "Success Get User By Id",
        result[0]
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  updateImage: async (req, res) => {
    try {
      const { id } = req.decodeToken;
      const result = await modelUser.getUserById(id);
      if (result[0] === undefined) {
        return helperWrapper.response(res, 404, "User Tidak Ditemukan", result);
      }
      const setData = {
        image: req.file ? req.file.filename : null,
        updatedAt: new Date(Date.now()),
      };
      if (req.file && result[0].image) {
        deleteFile(`public/uploads/user/${result[0].image}`);
      }
      const updateImage = await modelUser.updateProfile(setData, id);
      return helperWrapper.response(
        res,
        200,
        "Success Get User By Id",
        updateImage
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  getCity: async (req, res) => {
    try {
      const data = await modelUser.getCity();
      redis.setex(`city:`, 3600, JSON.stringify(data));

      return helperWrapper.response(res, 200, "Success Get City", data);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
};
