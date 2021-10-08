const fs = require("fs");

const deleteFile = (filePath) => {
  // fs.exsistSync // untuk mengecek keberadaan si file
  if (fs.existsSync(filePath)) {
    // fs.unlink // MENGHAPUS FILE
    fs.unlinkSync(filePath);
  }
};

module.exports = deleteFile;
