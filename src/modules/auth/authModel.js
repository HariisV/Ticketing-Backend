const connection = require("../../config/mysql");

module.exports = {
  register: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO users SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data,
          };
          delete newResult.password;
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  getUserByEmail: (email) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        email,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  getUserById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM users WHERE id = '${id}'`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  verifEmail: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `UPDATE users SET status = 'active' WHERE id = '${id}'`,
        (error) => {
          if (!error) {
            resolve(id);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
};
