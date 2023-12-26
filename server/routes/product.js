const express = require("express");
const controller = require("../controllers/Cproduct.js");
const router = express.Router();

// 상품 상세 페이지
router.get("/:productId", controller.productPage);

// '장바구니 담기' 클릭 시
router.post("/:productId", controller.cartIn);

// 찜하기
router.post("/wish/:productId", controller.wish);

// 장바구니 > '비회원으로 이용' 클릭 시
// router.post("/:productId/N", controller.noMemberCartIn);

// 장바구니 > '계속 쇼핑하기' 클릭 시
// 장바구니 > '장바구니 보기' 클릭 시

module.exports = router;
