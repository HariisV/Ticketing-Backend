const connection = require("../../config/mysql");

module.exports = {
  getDetailChart: (movieId, location, premier) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT MONTHNAME(b.createdAt) AS month, SUM(b.totalPayment) AS total FROM booking AS b JOIN schedule AS s WHERE YEAR(s.createdAt) = YEAR(NOW()) AND s.movieId = "${movieId}" AND s.location = "${location}" AND s.premier = "${premier}" GROUP BY MONTHNAME(b.createdAt) DESC`,
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
