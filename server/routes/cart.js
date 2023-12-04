const express = require("express");
const router = express.Router();
const controller = require("../controllers/Ccart.js");

// 장바구니 페이지 렌더링
router.get("/cart", controller.getCart);

// 장바구니 상품 수정
router.patch("/cart/:cartId", controller.editCart);

// 장바구니 상품 제거
router.delete("/cart/:cartId", controller.deleteCart);

// 장바구니 결제하기
router.get("/cart/checkout", controller.getCartCheckout);

module.exports = router;
