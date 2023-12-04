const AWS = require("aws-sdk");
const multer = require("multer");
const multer3 = require("multer-s3");
const path = require("path");

AWS.config.update({
  region: "", // region 값
  accessKeyId: "", // accessKeyId
  secretAccessKey: "", // secretAccessKey
});

const s3 = new AWS.S3();
const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];

const upload = multer({
  storage: multer3({
    s3: s3,
    bucket: "", // bucket-name
    key: (req, file, callback) => {
      const uploadDirectory = req.query.directory ?? "";
      const extention = -path.extname(file.originalname);
      // 확장자 검사
      if (!allowedExtensions.includes(extention)) {
        return callback(new Error("wrong extension"));
      }
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
    },
    acl: "public-read-write",
  }),
});

module.exports = upload;
