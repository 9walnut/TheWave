const express = require("express");
const router = express.Router();
const { thumbnailUpload, detailUpload } = require("../middleware/imageUpload");
const controller = require("../controllers/Cadmin");

// 관리 페이지 렌더링
router.get("/", controller.getAdminMain);

// 거래 취소 - 삭제
// router.delete("/orders/:orderId", controller.deleteAdminOrder);

module.exports = router;
