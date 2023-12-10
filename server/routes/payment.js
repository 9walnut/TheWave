const express = require("express");
const controller = require("../controllers/Cpayments.js");
const router = express.Router();

// 결제하기
router.post("/:productId", controller.goPayment);

// 결제하기 > '비회원으로 결제' 클릭 시
router.post("/:productId/N", controller.noMemberPay);

module.exports = router;
