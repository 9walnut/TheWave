const express = require("express");
const router = express.Router();
const controller = require("../controller/Cadmin");

// 관리 페이지 렌더링
router.get("/admin", controller.getUsers);

// 전체 회원 조회
router.get("/admin/users", controller.getAdminUsers);

// 회원 삭제
router.delete("/admin/users/:userNumber", controller.deleteAdminUsers);

// 상품 등록
router.post("/admin/products", controller.createAdminProduct);

// 전체 등록상품 조회
router.get("/admin/products", controller.getAdminAllProducts);

// 등록상품 상세 조회
router.get("/admin/products/:productID", controller.getAdminProduct);

// 등록 상품 수정
router.patch("/admin/products/:productID", controller.editAdminProduct);

// 등록 상품 삭제
router.delete("/admin/products/:productID", controller.deleteAdminProduct);

// 전체 주문현황 조회
router.get("/admin/orders", getAdminAllOrders);

// 주문 상세 조회
router.get("/admin/orders/:orderID", controller.getAdminOrder);

// 배송 상태 변경
router.patch("/admin/orders/:orderID", controller.editDeliveryStatus);

// 거래 취소 - 삭제
router.delete("/admin/orders/:orderID", controller.deleteAdminOrder);

module.exports = router;
