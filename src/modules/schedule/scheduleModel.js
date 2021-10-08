const connection = require("../../config/mysql");

module.exports = {
  getAllSchedule: (limit, offset, movieID, location, sort, sortType) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM schedule WHERE movieID Like ? AND location Like ? ORDER BY ${sort} ${sortType} LIMIT ? OFFSET ?`,
        [movieID, location, limit, offset],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            resolve(res);
          }
        }
      );
    }),
  getScheduleById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM schedule WHERE id = ${id}`,
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            resolve(res);
          }
        }
      );
    }),
  getCountSchedule: (movieID, location) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) As total FROM schedule WHERE movieID Like ? AND location Like ?",
        [movieID, location],
        (err, res) => { 
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            resolve(res[0].total);
          }
        }
      );
    }),
  postSchedule: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO schedule SET?", data, (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.sqlMessage}`));
        } else {
          const newRes = {
            id: res.insertId,
            ...data,
          };
          resolve(newRes);
        }
      });
    }),
  updateSchedule: (id, setData) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE schedule SET ? WHERE id = ?",
        [setData, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            const newRes = {
              id,
              ...setData,
            };
            resolve(newRes);
          }
        }
      );
    }),
  deletedSchedule: (id) =>
    new Promise((resolve, reject) => {
      connection.query("DELETE FROM schedule WHERE id = ?", id, (err, res) => {
        if (err) {
          reject(new Error(`bad Request: ${err.sqlMessage}`));
        } else {
          resolve(res);
        }
      });
    }),
};
