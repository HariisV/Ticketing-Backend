const connection = require("../../config/mysql");

module.exports = {
  getUserById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM users WHERE ID = "${id}"`,
        (error, result) => {
          if (!error) {
            const newResult = {
              ...result,
            };
            delete newResult.password;
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  updateProfile: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET ? WHERE id = ?",
        [data, id],
        (error) => {
          if (!error) {
            const newResult = {
              id,
              ...data,
            };
            delete newResult.password;
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
};
