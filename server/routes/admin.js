const express = require("express");
const router = express.Router();
const controller = require("../controllers/Cadmin");

// 관리 페이지 렌더링
router.get("/", controller.getAdminMain);

module.exports = router;
