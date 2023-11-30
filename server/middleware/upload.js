const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, done) {
      done(null, "public/img");
    },
    filename: function (req, file, done) {
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);
      const fileName = baseName + "_" + Date.now() + ext;

      done(null, fileName);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
