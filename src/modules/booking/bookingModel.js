const connection = require("../../config/mysql");

module.exports = {
  getAllBooking: (id, idUser) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT booking.id, booking.invoice,booking.userId,booking.dateBooking,booking.timeBooking,booking.movieId,booking.scheduleId,booking.totalTicket,booking.totalPayment,booking.paymentMethod,booking.statusPayment, seatbooking.seat
FROM booking
INNER JOIN seatbooking
ON booking.id = seatbooking.bookingId
WHERE booking.id = ${id}
OR booking.userId = ${idUser}`,
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            resolve(res);
          }
        }
      );
    }),
  getAllBookingSeat: (idSchedule, idMovie, dateSchedule, timeSchedule) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT id,seat FROM seatbooking where scheduleId = ${idSchedule} AND movieId = ${idMovie} AND dateSchedule = "${dateSchedule}" AND timeSchedule = "${timeSchedule}" ORDER BY seat ASC`,
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            resolve(res);
          }
        }
      );
    }),
  getPriceBySchedule: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT price FROM schedule WHERE id = ${id}`,
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            resolve(res[0].price);
          }
        }
      );
    }),
  getBookingByIdUser: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM booking WHERE userId = ${id}`,
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            resolve(res);
          }
        }
      );
    }),
  postBooking: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO booking SET ?", data, (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.sqlMessage}`));
        } else {
          resolve(res.insertId);
        }
      });
    }),
  postBookingSeat: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO seatbooking SET ?", data, (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.sqlMessage}`));
        } else {
          resolve(res.insertId);
        }
      });
    }),
};
