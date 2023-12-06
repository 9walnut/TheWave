const express = require("express");
const controller = require("../controllers/Cproduct.js");
const router = express.Router();

// 상품 상세 페이지
router.get("/product/:productId", controller.productPage);

// 장바구니 담기
router.post("/product/:productId", controller.cartIn);

module.exports = router;
