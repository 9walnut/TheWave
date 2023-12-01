const express = require("express");
const controller = require("../controllers/Cauth");
const router = express.Router();

// 메인 페이지
router.get("/", controller.main);

// 로그인 페이지
router.get("/login", controller.loginPage);

// '로그인' 버튼 클릭 시
router.post("/login", controller.loginUser);

// 회원가입 페이지
router.get("/register", controller.registerPage);

// '가입' 버튼 클릭 시
router.post("/register", controller.register);

// 아이디 찾기 페이지
router.get("/findId", controller.findIdPage);

// 아이디 찾기
router.post("/findId", controller.findId);

// 비밀번호 찾기 페이지
router.get("/findPw", controller.findPw);

// 비밀번호 재설정
router.post("/findPw/newPw", controller.newPw);

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
