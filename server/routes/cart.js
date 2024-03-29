const express = require("express");
const router = express.Router();
const controller = require("../controllers/Ccart.js");

// 장바구니 페이지 렌더링
router.get("/", controller.getCart);

// 장바구니 상품 수정
router.patch("/:cartId", controller.editCart);

// 장바구니 상품 제거
router.delete("/", controller.deleteCart);

// 장바구니 주문하기
router.post("/checkout", controller.payCart);

module.exports = router;
