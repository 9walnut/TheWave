const express = require("express");
const controller = require("../controllers/Cpayment.js");
const router = express.Router();

// 결제하기
router.post("/payment/:productId", controller.goPayment);

module.exports = router;
