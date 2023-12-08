const express = require("express");
const router = express.Router();
const { thumbnailUpload, detailUpload } = require("../middleware/imageUpload");
const controller = require("../controllers/Cadmin");

// 관리 페이지 렌더링
router.get("/", controller.getAdminMain);

// 전체 회원 조회
router.get("/users", controller.getAdminUsers);

// 전체 조회 - 회원 삭제 기능(체크박스)
router.delete("/users", controller.deleteAdminUsers);

// 상품 등록
router.post("/products", controller.createAdminProduct);

// 상품 등록 - 썸네일 사진 등록
router.post(
  "/products/thumbnail",
  thumbnailUpload.array("thumbnailUrl"),
  controller.uploadThumbnail
);

// 상품 등록 - 상세 사진 등록
router.post(
  "/products/detail",
  detailUpload.array("detailUrls"),
  controller.uploadDetails
);

// 전체 등록상품 조회
router.get("/products", controller.getAdminAllProducts);

// 등록상품 상세 조회
router.get("/products/:productId", controller.getAdminProduct);

// 등록 상품 수정
router.patch("/products/:productID", controller.editAdminProduct);

// 등록 상품 삭제
router.delete("/products/:productId", controller.deleteAdminProduct);

// 전체 주문현황 조회
router.get("/orders", controller.getAdminAllOrders);

// 주문 상세 조회
router.get("/orders/:orderId", controller.getAdminOrder);

// 배송 상태 변경
router.patch("/orders/:orderId", controller.editDeliveryStatus);

// 거래 취소 - 삭제
router.delete("/orders/:orderId", controller.deleteAdminOrder);

module.exports = router;
