const express = require("express");
const controller = require("../controllers/Cshop");
const router = express.Router();

// 카테고리별 상품 페이지
router.get("/category/:categoryName", controller.categoryPage);

// 상품 상세 페이지
router.get("/product/:productId", controller.productPage);

// 장바구니 담기
router.post("/payment/:productsId", controller.shop);

// 결제하기
router.get("/payment", controller.payment);
