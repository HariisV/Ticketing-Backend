/* eslint-disable no-await-in-loop */
const bookingModel = require("./bookingModel");
const helperWrapper = require("../../helpers/wrapper");

module.exports = {
  getAllBooking: async (req, res) => {
    try {
      let { idBooking, idUser } = req.query;
      idBooking = idBooking || "0";
      idUser = idUser || "0";
      if (idBooking === 0 && idUser === 0) {
        return helperWrapper.response(
          res,
          400,
          `Hanya Bisa Menerima 1 Parameter`,
          null
        );
      }
      if (idBooking !== "0") {
        const getData = await bookingModel.getAllBooking(idBooking, idUser);
        if (getData.length < 1) {
          return helperWrapper.response(
            res,
            400,
            `Data Tidak Ditemukan Maybe id Booking Salah`,
            null
          );
        }

        const result = { ...getData[0] };
        result.seat = [];
        getData.forEach((element) => {
          result.seat.push(element.seat);
        });
        return helperWrapper.response(res, 200, "success Get Data", result);
      }
      if (idUser !== "0") {
        const tampungResult = [];
        const rest = await bookingModel.getBookingByIdUser(idUser);
        if (rest.length < 1) {
          return helperWrapper.response(
            res,
            400,
            `Data Tidak Ditemukan Maybe id User Salah`,
            null
          );
        }
        for (const element of rest) {
          const getData = await bookingModel.getAllBooking(element.id, "0");
          const result = { ...getData[0] };
          result.seat = [];
          getData.forEach((item) => {
            result.seat.push(item.seat);
          });
          tampungResult.push(result);
        }
        return helperWrapper.response(
          res,
          200,
          "success Get Data",
          tampungResult
        );
      }
      return helperWrapper.response(res, 400, `Data Tidak Ditemukan`, null);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad Request : ${error.message}`,
        null
      );
    }
  },
  getAllBookingSeat: async (req, res) => {
    try {
      let { idSchedule, idMovie, dateSchedule, timeSchedule } = req.query;
      idSchedule = idSchedule || "0";
      idMovie = idMovie || "0";
      dateSchedule = dateSchedule || "0";
      timeSchedule = timeSchedule || "0";
      const getData = await bookingModel.getAllBookingSeat(
        idSchedule,
        idMovie,
        dateSchedule,
        timeSchedule
      );
      if (getData < 1) {
        return helperWrapper.response(res, 400, `Data Tidak Ditemukan`, null);
      }
      return helperWrapper.response(res, 200, "success Get Data", getData);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad Request : ${error.message}`,
        null
      );
    }
  },
  postBooking: async (req, res) => {
    try {
      const {
        userId,
        scheduleId,
        movieId,
        fullName,
        Email,
        phoneNumber,
        dateBooking,
        timeBooking,
        paymentMethod,
        statusPayment,
        seat,
      } = req.body;
      const cekPrice = await bookingModel.getPriceBySchedule(scheduleId);
      if (cekPrice.length < 1) {
        return helperWrapper.response(
          res,
          400,
          `ScheduleId: ${scheduleId} Tidak Ditemukan`,
          null
        );
      }
      const setDataBooking = {
        invoice: `INV-${
          Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000
        }-${new Date().getDate()}-${new Date().getMonth()}`,
        userId,
        movieId,
        scheduleId,
        fullName,
        Email,
        phoneNumber,
        dateBooking,
        timeBooking,
        totalTicket: seat.length,
        totalPayment: cekPrice[0].price * seat.length,
        paymentMethod,
        statusPayment,
        createdAt: new Date(Date.now()),
      };

      const postBooking = await bookingModel.postBooking(setDataBooking);
      await seat.forEach((element) => {
        const setDataBookingSeat = {
          bookingId: postBooking,
          scheduleId,
          movieId,
          dateSchedule: dateBooking,
          timeSchedule: timeBooking,
          seat: element,
          createdAt: new Date(Date.now()),
        };
        bookingModel.postBookingSeat(setDataBookingSeat);
      });

      return helperWrapper.response(
        res,
        200,
        "success Created Data",
        setDataBooking
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
  updateBooking: async (req, res) => {
    try {
      const { id } = req.params;
      let result;
      const {
        userId,
        scheduleId,
        movieId,
        fullName,
        Email,
        phoneNumber,
        dateBooking,
        timeBooking,
        paymentMethod,
        statusPayment,
        seat,
      } = req.body;
      const notNull = await bookingModel.getBookingById(id);
      if (notNull.length < 1) {
        return helperWrapper.response(
          res,
          400,
          `Tidak Ditemukan Booking Dengan Id ${id}`,
          null
        );
      }
      const setDataDefault = {
        userId,
        movieId,
        scheduleId,
        fullName,
        Email,
        phoneNumber,
        dateBooking,
        timeBooking,
        paymentMethod,
        statusPayment,
        updatedAt: new Date(Date.now()),
      };
      if (seat != null) {
        const cekPrice = await bookingModel.getPriceBySchedule(scheduleId);
        if (cekPrice.length < 1) {
          return helperWrapper.response(
            res,
            400,
            `ScheduleId: ${scheduleId} Tidak Ditemukan`,
            null
          );
        }
        const setDataSeat = {
          ...setDataDefault,
          totalTicket: seat.length,
          totalPayment: cekPrice[0].price * seat.length,
        };

        await bookingModel.deletedBookingSeat(id);
        await seat.forEach((element) => {
          const setDataBookingSeat = {
            bookingId: id,
            scheduleId,
            movieId,
            dateSchedule: dateBooking,
            timeSchedule: timeBooking,
            seat: element,
            updatedAt: new Date(Date.now()),
          };
          bookingModel.postBookingSeat(setDataBookingSeat);
        });
        result = await bookingModel.updateBooking(setDataSeat, id);
      } else {
        result = await bookingModel.updateBooking(setDataDefault, id);
      }

      return helperWrapper.response(
        res,
        200,
        "Success, Data Hasbeen Change",
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
  deleteBookingWithSeat: async (req, res) => {
    try {
      const { id } = req.params;

      const notNull = await bookingModel.getBookingById(id);
      if (notNull.length < 1) {
        return helperWrapper.response(
          res,
          400,
          `Tidak Ditemukan Booking Dengan Id ${id}`,
          null
        );
      }
      await bookingModel.deletedBookingWithSeat(id);
      await bookingModel.deletedBookingSeat(id);

      return helperWrapper.response(
        res,
        200,
        `Success, Deleted Data With Id = ${id}`,
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
