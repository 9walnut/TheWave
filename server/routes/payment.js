const express = require("express");
const controller = require("../controllers/Cpayments.js");
const router = express.Router();

// 상품 상세 페이지 구매하기 버튼 클릭 시 (주문 정보 확인)
router.post("/orderList/:productId", controller.goPayment);

// 주문 정보 > 결제하기
router.post("/:productId", controller.payment);

// 결제하기 > '비회원으로 결제' 클릭 시
// router.post("/:productId/N", controller.noMemberPay);

module.exports = router;
