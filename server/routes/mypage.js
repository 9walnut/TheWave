const express = require("express");
const controller = require("../controllers/Cmypage");
const router = express.Router();

// 회원 마이페이지
router.get("/mypage", controller.mypage);

// 회원 정보 수정 페이지
router.get("/mypage/info", controller.editInfo);

// 회원 정보 수정 페이지 > 비밀번호 인증
router.post("/mypage/pwCheck", controller.editInfoPw);

// 회원 정보 수정
router.patch("/mypage/info", controller.editInfo);

// 회원 탈퇴
router.delete("/mypage", controller.deleteUser);

module.exports = router;
