/* eslint-disable no-restricted-syntax */
const multer = require("multer");
const helperWrapper = require("../helpers/wrapper/index");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/uploads/movie");
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage }).single("image");

// single : untuk mengupload file tapi yang di upload hanya 1 file saja
// array : untuk mengupload file tapi yang di upload lebih dari 1 file
// fields : untuk mengupload file di lebih dari 1 field

const uploadFilter = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return helperWrapper.response(res, 401, err.message, null);
    }
    if (err) {
      // An unknown error occurred when uploading.
      return helperWrapper.response(res, 401, err.message, null);
    }
    // Everything went fine.
    return next();
  });
};

module.exports = uploadFilter;
