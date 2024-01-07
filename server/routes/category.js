const express = require("express");
const controller = require("../controllers/Ccategory.js");
const router = express.Router();

// 베스트 상품
router.get("/best", controller.bestPage);

// 카테고리별 상품 페이지
router.get("/:categoryId", controller.categoryPage);

module.exports = router;
