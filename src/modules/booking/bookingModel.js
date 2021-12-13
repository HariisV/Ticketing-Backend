const connection = require("../../config/mysql");

module.exports = {
  getAllBooking: (id, idUser) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT booking.id, booking.invoice,schedule.premier, movie.name, booking.userId,booking.dateBooking,booking.timeBooking,booking.movieId,booking.scheduleId,booking.totalTicket,booking.totalPayment,booking.paymentMethod,booking.statusPayment, seatbooking.seat
FROM booking
INNER JOIN seatbooking ON booking.id = seatbooking.bookingId
INNER JOIN movie ON booking.movieId = movie.id
INNER JOIN schedule ON booking.scheduleId = schedule.id
WHERE booking.id = ${id}
${idUser === 0 ? `OR booking.userId = ${idUser}` : ""}`,
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
  getBookingById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM booking WHERE id = "${id}"`,
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
            resolve(res);
          }
        }
      );
    }),
  getBookingByIdUser: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM booking WHERE userId = "${id}"`,
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            resolve(res);
          }
        }
      );
    }),
  getBookingByIdINV: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT movie.name,booking.fullName, booking.dateBooking, booking.timeBooking,schedule.premier,seatbooking.seat
        FROM booking
        JOIN seatbooking
        ON booking.id = seatbooking.bookingId
        JOIN movie
        ON booking.movieId = movie.id
        JOIN schedule
        ON booking.scheduleId = schedule.id
        WHERE booking.invoice = '${id}'`,
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
  updateBooking: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE booking SET ? WHERE id = ?",
        [data, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            const newRes = {
              id,
              ...data,
            };
            resolve(newRes);
          }
        }
      );
    }),
  updateBookingByInvoice: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE booking SET ? WHERE invoice = ?",
        [data, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            const newRes = {
              id,
              ...data,
            };
            resolve(newRes);
          }
        }
      );
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
  deletedBookingWithSeat: (idBooking) =>
    new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM booking WHERE id = ${idBooking}`,
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            resolve(res);
          }
        }
      );
    }),
  deletedBookingSeat: (deletedSeat) =>
    new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM seatbooking WHERE bookingId = ${deletedSeat}`,
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.sqlMessage}`));
          } else {
            resolve(res);
          }
        }
      );
    }),
};
