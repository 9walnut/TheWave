const express = require("express");
const controller = require("../controllers/Cshop");
const router = express.Router();

// 장바구니 담기
router.post("/product/:productId", controller.cartIn);

module.exports = router;
