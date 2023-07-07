const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "image") {
      cb(null, "../front/src/public/img");
    } else if (file.fieldname == "file") {
      cb(null, "../front/src/public/files");
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
