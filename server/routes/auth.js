const express = require("express");
const controller = require("../controllers/Cauth");
const passport = require("passport");
const router = express.Router();

// 메인 페이지
router.get("/", controller.main);

// 로그인 페이지
router.get("/login", controller.loginPage);

// '로그인' 버튼 클릭 시
router.post("/login", controller.loginUser);

// 카카오 로그인
router.get("/login/kakao", passport.authenticate("kakao"));

// 카카오 로그인 콜백
router.get(
  "/login/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "http://localhost:3000/login/kakao", // 로그인 실패 시 리다이렉션 주소
  }),
  (req, res) => {
    // 로그인 성공 시 리다이렉션 주소
    res.redirect("http://localhost:3000");
  }
);

// 네이버 로그인
router.get("/login/naver", passport.authenticate("naver"));

// 네이버 로그인 콜백
router.get(
  "/login/naver/callback",
  passport.authenticate("naver", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

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
