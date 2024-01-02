const express = require("express");
const router = express.Router();
const controller = require("../controllers/CadminUsers");

// 전체 회원 조회
router.get("/", controller.getAdminUsers);

// 전체 조회 - 회원 삭제 기능(체크박스)
router.delete("/", controller.deleteAdminUsers);

module.exports = router;
