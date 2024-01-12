const express = require("express");
const controller = require("../controllers/Cpayments.js");
const router = express.Router();

// 상품 상세 페이지 구매하기 버튼 클릭 시 (주문 정보 확인)
router.post("/orderList/:productId", controller.goPayment);

// 주문 정보 > 결제하기
router.post("/", controller.payment);
router.post("/cart", controller.cartPayment);

module.exports = router;
