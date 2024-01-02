const express = require("express");
const router = express.Router();
const controller = require("../controllers/CadminOrders");

// 전체 주문현황 조회
router.get("/", controller.getAdminAllOrders);

// 주문 상세 조회
router.get("/:orderId", controller.getAdminOrder);

// 출고 상태 변경
router.patch("/:orderId", controller.updateOutStatus);

module.exports = router;
