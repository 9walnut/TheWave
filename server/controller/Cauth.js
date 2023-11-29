const { user } = require("../models");

// 메인 페이지 렌더
exports.main = (req, res) => {
  res.render("main");
};

// 로그인 페이지 랜더
exports.loginPage = (req, res) => {
  res.render("login");
};

// '로그인' 버튼 클릭 시
exports.loginUser = async (req, res) => {};
