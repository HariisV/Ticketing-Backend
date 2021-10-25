const connection = require("../../config/mysql");

module.exports = {
  getAllMovie: (limit, offset, name, sort, sortType) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM movie WHERE name LIKE ? ORDER BY ${sort} ${sortType} LIMIT ? OFFSET ?`,
        [name, limit, offset],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            resolve(res);
          }
        }
      );
    }),
  getMovieUpcoming: (date) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM movie WHERE releaseDate > "${date}"`,
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            resolve(res);
          }
        }
      );
    }),
  getMovieUpcomingFilter: (date, Month) =>
    new Promise((resolve, reject) => {
      const pp = connection.query(
        `SELECT * FROM movie WHERE releaseDate > "${date}" AND Month(releaseDate) = "${Month}" AND Year(releaseDate) > 2021`,
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            resolve(res);
          }
        }
      );
      console.log(pp.sql);
    }),
  getMovieById: (id) =>
    new Promise((resolve, reject) => {
      connection.query("SELECT * FROM movie WHERE id = ?", id, (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.sqlMessage}`));
        } else {
          resolve(res);
        }
      });
    }),
  getCountMovie: (name) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) As total FROM movie WHERE name LIKE ?",
        name,
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            resolve(res[0].total);
          }
        }
      );
    }),
  postMovie: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO Movie SET ?", data, (error, result) => {
        if (!error) {
          const newRes = {
            id: result.insertId,
            ...data,
          };
          resolve(newRes);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  updateMovie: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query("UPDATE Movie SET ? WHERE id = ?", [data, id], (err) => {
        if (!err) {
          const newRes = {
            id,
            ...data,
          };
          resolve(newRes);
        } else {
          reject(new Error(`SQL : ${err.sqlMessage}`));
        }
      });
    }),

  deleteMovie: (id) =>
    new Promise((resolve, reject) => {
      connection.query("DELETE FROM movie WHERE id = ?", id, (err) => {
        if (!err) {
          resolve(id);
        } else {
          reject(new Error(`SQL : ${err.sqlMessage}`));
        }
      });
    }),
};
