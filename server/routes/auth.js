const express = require("express");
const controller = require("../controllers/Cauth");
const router = express.Router();

// 메인 페이지
router.get("/", controller.main);

// 로그인 페이지
router.get("/login", controller.loginPage);

// '로그인' 버튼 클릭 시
router.post("/login", controller.loginUser);

// 간편 로그인
router.post("/snsLogin", controller.loginSNS);

// '로그아웃' 버튼 클릭 시
router.get("/logout", controller.logout);

// '아이디 중복 확인' 버튼 클릭시
router.post("/register/idCheck", controller.idCheck);

// 회원가입 페이지
router.get("/register", controller.registerPage);

// '가입' 버튼 클릭 시
router.post("/register", controller.register);

// 아이디 찾기 페이지
router.get("/findId", controller.findIdPage);

// 아이디 찾기
router.post("/findId", controller.findId);

// 비밀번호 찾기 페이지
router.post("/findPw", controller.findPw);

// 비밀번호 재설정
router.post("/findPw/newPw", controller.newPw);

module.exports = router;
