const AWS = require("aws-sdk");
const multer = require("multer");
const multer3 = require("multer-s3");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

AWS.config.update({
  region: process.env.AWS_REGION, // region 값
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // accessKeyId
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // secretAccessKey
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
