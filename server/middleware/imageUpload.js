const AWS = require("aws-sdk");
const multer = require("multer");
const multer3 = require("multer-s3");
const path = require("path");

AWS.config.update({
  region: "ap-northeast-2", // region 값
  accessKeyId: "AKIA6FD5HWZ6243X6SHZ", // accessKeyId
  secretAccessKey: "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", // secretAccessKey
});

const s3 = new AWS.S3();
const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];

const thumbnailUpload = multer({
  storage: multer3({
    s3: s3,
    bucket: "thewave-bucket", // bucket-name
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
    bucket: "thewave-bucket", // bucket-name
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
