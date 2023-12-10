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

const thumbnailUpload = multer({
  storage: multer3({
    s3: s3,
    bucket: "", // bucket-name
    key: (req, file, callback) => {
      const uploadDirectory = "thumbnails";
      const extension = path.extname(file.originalname);
      // 확장자 검사
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("wrong extension"));
      }
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
    },
    acl: "public-read-write",
  }),
});

const detailUpload = multer({
  storage: multer3({
    s3: s3,
    bucket: "", // bucket-name
    key: (req, file, callback) => {
      const uploadDirectory = "details";
      const extension = path.extname(file.originalname);
      // 확장자 검사
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("wrong extension"));
      }
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
    },
    acl: "public-read-write",
  }),
});

module.exports = { thumbnailUpload, detailUpload };
