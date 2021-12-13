/* eslint-disable no-await-in-loop */
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const bookingModel = require("./bookingModel");
const helperWrapper = require("../../helpers/wrapper");
const midtrans = require("../../helpers/midtrans");

module.exports = {
  getAllBooking: async (req, res) => {
    try {
      let { idBooking, idUser } = req.query;
      idBooking = idBooking || "0";
      idUser = idUser || "0";
      if (idBooking !== "0" && idUser !== "0") {
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
        return helperWrapper.response(
          res,
          200,
          "success Get Data From ID",
          result
        );
      }
      if (idUser !== "0") {
        console.log("=>>>>>>>>>>>>>>>>>>>>>>>>>>WOWOSSS=> ", idBooking, idUser);

        const tampungResult = [];
        const rest = await bookingModel.getBookingByIdUser(idUser);
        if (rest.length < 1) {
          return helperWrapper.response(
            res,
            200,
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
          "success Get Data from User ID",
          tampungResult
        );
      }
      return helperWrapper.response(res, 404, `Data Tidak Ditemukan`, null);
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
      const { idSchedule, idMovie, dateSchedule, timeSchedule } = req.query;
      if (!idSchedule || !idMovie || !dateSchedule || !timeSchedule) {
        return helperWrapper.response(
          res,
          400,
          `Error,Semua Field harus Diisi`,
          null
        );
      }
      const getData = await bookingModel.getAllBookingSeat(
        idSchedule,
        idMovie,
        dateSchedule,
        timeSchedule
      );
      if (getData < 1) {
        return helperWrapper.response(res, 404, `Data Tidak Ditemukan`, null);
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
        scheduleId,
        movieId,
        fullName,
        Email,
        phoneNumber,
        dateBooking,
        timeBooking,
        paymentMethod,
        seat,
      } = req.body;
      const { id: userId } = req.decodeToken;
      const cekPrice = await bookingModel.getPriceBySchedule(scheduleId);
      if (cekPrice.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `ScheduleId: ${scheduleId} Tidak Ditemukan`,
          null
        );
      }
      let setDataBooking = {
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
        statusPayment: "Pending",
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
      const resultMidtrans = await midtrans.post(
        setDataBooking.invoice,
        setDataBooking.totalPayment
      );
      setDataBooking = {
        id: postBooking,
        ...setDataBooking,
        seat,
        paymentUrl: resultMidtrans,
      };

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
      Object.keys(setDataDefault).forEach((element) => {
        if (!setDataDefault[element]) {
          delete setDataDefault[element];
        }
      });
      if (seat != null) {
        const cekPrice = await bookingModel.getPriceBySchedule(scheduleId);
        if (cekPrice.length < 1) {
          return helperWrapper.response(
            res,
            404,
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
        result = { ...result, seat };
      } else {
        result = await bookingModel.updateBooking(setDataDefault, id);
      }

      return helperWrapper.response(
        res,
        200,
        `Success, Data With Id: ${id} Hasbeen Change`,
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
          404,
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
  notifyMidtransBooking: async (req, res) => {
    try {
      const result = await midtrans.notif(req.body);
      const {
        order_id: bookingId,
        transaction_status: transactionStatus,
        fraud_status: fraudStatus,
        paymentType,
      } = result;
      if (transactionStatus === "capture") {
        if (fraudStatus === "challenge") {
          // TODO set transaction status on your databaase to 'challenge'
        } else if (fraudStatus === "accept") {
          const setData = {
            paymentMethod: paymentType,
            statusPayment: "success",
          };
          const cek = await bookingModel.updateBookingByInvoice(
            setData,
            bookingId
          );
          return helperWrapper.response(
            res,
            200,
            `Succes Change For ${bookingId}`,
            cek
          );
        }
      } else if (transactionStatus === "settlement") {
        const setData = {
          paymentMethod: paymentType,
          statusPayment: "success",
        };
        const cek = await bookingModel.updateBookingByInvoice(
          setData,
          bookingId
        );
        return helperWrapper.response(
          res,
          200,
          `Succes Change For ${bookingId}`,
          cek
        );
      } else if (transactionStatus === "deny") {
        // TODO you can ignore 'deny', because most of the time it allows payment retries
        // and later can become success
      } else if (
        transactionStatus === "cancel" ||
        transactionStatus === "expire"
      ) {
        const setData = {
          statusPayment: "failed",
        };
        const cek = await bookingModel.updateBookingByInvoice(
          setData,
          bookingId
        );
        return helperWrapper.response(
          res,
          200,
          `Succes Change For ${bookingId}`,
          cek
        );

        // MENJALANKAN MODEL UNTUK MENGUBAH STATUS BOOKING MENJADI GAGAL
      } else if (transactionStatus === "pending") {
        // TODO set transaction status on your databaase to 'pending' / waiting payment
      }
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  exportTicket: async (req, res) => {
    try {
      const { id } = req.params;
      const notNull = await bookingModel.getBookingByIdINV(id);
      const tampungSeat = { ...notNull[0] };
      tampungSeat.seat = [];
      notNull.forEach((element) => {
        tampungSeat.seat.push(element.seat);
      });

      const fileName = `ticket-${id}.pdf`;
      const result = {
        movieName: tampungSeat.name,
        fullName: tampungSeat.fullName,
        premier: tampungSeat.premier,
        dateBooking: tampungSeat.dateBooking.toLocaleDateString("id-ID"),
        timeBooking: tampungSeat.timeBooking,
        seat: tampungSeat.seat,
      };
      ejs.renderFile(
        path.resolve("./src/template/pdf/ticket.ejs"),
        { result },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            const options = {
              height: "11.25in",
              width: "8.5in",
              header: {
                height: "10mm",
              },
              footer: {
                height: "10mm",
              },
            };
            pdf
              .create(result, options)
              .toFile(
                path.resolve(`./public/generate/${fileName}`),
                (error, result) => {
                  if (error) {
                    console.log(error);
                  } else {
                    return helperWrapper.response(
                      res,
                      200,
                      "Success export ticket",
                      {
                        url: `http://localhost:3001/generate/${fileName}`,
                      }
                    );
                    // console.log({
                    //   url: `http://localhost:3001/generate/${fileName}`,
                    // });
                  }
                }
              );
          }
        }
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
};
