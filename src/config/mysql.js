// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
// console.log(process.DB_DATABASE);
connection.connect((error) => {
  if (error) {
    throw error;
  }

  // eslint-disable-next-line no-console
  console.log(`You're now Connect`);
});

module.exports = connection;
