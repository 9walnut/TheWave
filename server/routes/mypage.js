const express = require("express");
const controller = require("../controllers/Cmypage");
const router = express.Router();

// 회원 마이페이지
router.get("/", controller.mypage);

// 회원 정보 수정 페이지
router.get("/info", controller.editInfoPage);

// 회원 정보 수정 페이지 > 비밀번호 인증
router.post("/pwCheck", controller.editInfoPw);

// 회원 정보 수정
router.patch("/info", controller.editInfo);

// 회원 탈퇴
router.delete("/", controller.deleteUser);

module.exports = router;

// 주문 내역 추가 필요
