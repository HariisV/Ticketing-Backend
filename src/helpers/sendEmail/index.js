// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // naturally, replace both with your real credentials or an application-specific password
  },
});

module.exports = {
  register: (email, name, keyId) => {
    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".html",
          partialsDir: path.resolve("./src/template/email"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./src/template/email"),
        extName: ".html",
      })
    );

    const mailOptions = {
      from: "Tickez.com",
      to: email,
      subject: "Confirm Your Email To Tickez.com Account !",
      text: "Confirm Your Email To Tickez.com Account",
      template: "email-verification", // ISI DARI EMAIL
      context: {
        email,
        name,
        keyId,
        url: process.env.APP_URL,
      }, // DATA YANG NNTI BSA DIMASUKAN KE DALAM TEMPLATE
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("gkeror");
      }
    });
  },
};
