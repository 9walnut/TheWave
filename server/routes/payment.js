const express = require("express");
const controller = require("../controllers/Cmypage.js");
const router = express.Router();

// 장바구니 담기
router.post("/payment/:productId", controller.cartIn);

module.exports = router;
