const express = require("express");
const controller = require("../controllers/Cmypage");
const router = express.Router();

// 회원 마이페이지
router.get("/", controller.mypage);

// 위시리스트(찜한 상품) 조회
router.get("/wishList", controller.wishList);

// 위시리스트 > 상품 장바구니 담기
router.post("/wishList", controller.wishToCart);

// 위시리스트 > 상품 삭제
router.delete("/wishList", controller.deleteWish);

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
