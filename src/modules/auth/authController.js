// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const helperWrapper = require("../../helpers/wrapper");
const modelAuth = require("./authModel");
const redis = require("../../config/redis");
const sendEmail = require("../../helpers/sendEmail");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, firstName, lastName, password, phoneNumber } = req.body;
      const isRegister = await modelAuth.getUserByEmail(email);
      // if (isRegister.length > 0) {
      //   return helperWrapper.response(
      //     res,
      //     400,
      //     `Email: ${email} Telah digunakan Di Akun Lain`,
      //     null
      //   );
      // }
      // PROSES ENCRYPT PASSWORD
      const setData = {
        id: uuidv4(),
        email,
        firstName,
        role: "user",
        phoneNumber,
        lastName,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      };

      const result = await modelAuth.register(setData);
      sendEmail.register(email, firstName, result.id);

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
  verifEmail: async (req, res) => {
    try {
      const { id } = req.params;
      const isRegister = await modelAuth.getUserById(id);
      if (isRegister.length < 1) {
        return helperWrapper.response(
          res,
          400,
          `Akun Dengan Id: ${id} Tidak Ditemukan `,
          null
        );
      }
      const result = await modelAuth.verifEmail(id);
      res.redirect(`${process.env.APP_URL_FRONTEND}/register?page=success`);

      // return helperWrapper.response(res, 200, "Success Actived User", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkUser = await modelAuth.getUserByEmail(email);

      if (checkUser.length < 1) {
        return helperWrapper.response(res, 400, "Email not registed", null);
      }
      if (checkUser[0].status === "notActive") {
        return helperWrapper.response(res, 400, "Account Not Actived", null);
      }
      const checkPassword = await bcrypt.compareSync(
        password,
        checkUser[0].password
      );
      if (checkPassword === false) {
        return helperWrapper.response(res, 400, "Wrong password", null);
      }
      // PROSES UTAMA MEMBUAT TOKEN MENGGUNAKAN JWT (DATA YANG MAU DIUBAH, KATA KUNCI, LAMA TOKEN BISA DIGUNAKAN )
      const payload = checkUser[0];
      delete payload.password;
      const token = jwt.sign({ ...payload }, process.env.JWT_PRIVATE, {
        expiresIn: "24h",
      });

      // RefresHToken
      const refreshToken = jwt.sign({ ...payload }, process.env.JWT_PRIVATE, {
        expiresIn: "24h",
      });

      return helperWrapper.response(res, 200, "Success login", {
        id: payload.id,
        token,
        refreshToken,
      });
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  logout: async (req, res) => {
    try {
      let token = req.headers.authorization;
      // eslint-disable-next-line prefer-destructuring
      token = token.split(" ")[1];
      redis.setex(`accessToken:${token}`, 3600 * 24, token);
      return helperWrapper.response(res, 200, "Success logout", null);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  refreshToken: async (req, res) => {
    try {
      // console.log(req.body);
      const { refreshToken } = req.body;
      // PROSES PENGECEKAN REFRESH TOKEN APAKAH BISA DIGUNAKAN ATAU TIDAK
      redis.get(`refreshToken:${refreshToken}`, (error, result) => {
        if (!error && result !== null) {
          return helperWrapper.response(
            res,
            403,
            "Your refresh token cannot be use"
          );
        }
        jwt.verify(refreshToken, process.env.JWT_PRIVATE, (error, result) => {
          if (error) {
            return helperWrapper.response(res, 403, error.message);
          }
          delete result.iat;
          delete result.exp;
          const token = jwt.sign(result, process.env.JWT_PRIVATE, {
            expiresIn: "1h",
          });
          const newRefreshToken = jwt.sign(result, process.env.JWT_PRIVATE, {
            expiresIn: "24h",
          });
          redis.setex(`refreshToken:${refreshToken}`, 3600 * 24, refreshToken);
          return helperWrapper.response(res, 200, "Success Refresh Token !", {
            id: result.id,
            token,
            refreshToken: newRefreshToken,
          });
        });
      });
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
