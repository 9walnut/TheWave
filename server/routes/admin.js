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

// 전체 등록상품 조회
router.get("/products", controller.getAdminAllProducts);

// 등록 상품 삭제 - 체크 박스
router.delete("/products", controller.deleteAdminProductsChecked);

// 상품 등록
router.post("/products/add", controller.createAdminProduct);

// 상품 등록 - 썸네일 사진 등록
router.post(
  "/products/add/thumbnail",
  thumbnailUpload.single("thumbnailUrl"),
  controller.uploadThumbnail
);

// 상품 등록 - 상세 사진 등록
router.post(
  "/products/add/detail",
  detailUpload.array("detailUrls", 10),
  controller.uploadDetails
);

// 등록상품 상세 조회
router.get("/products/:productId", controller.getAdminProduct);

// 등록 상품 수정
router.patch("/products/:productId", controller.editAdminProduct);

// 썸네일 사진 수정
router.patch(
  "/products/:productId/thumbnail",
  thumbnailUpload.array("thumbnailUrl"),
  controller.uploadThumbnail
);

// 상세 사진 수정
router.patch(
  "/products/:productId/detail",
  detailUpload.array("detailUrls"),
  controller.uploadDetails
);

// 등록 상품 삭제 - 상세 조회 페이지 내부
router.delete("/products/:productId", controller.deleteAdminProduct);

// 전체 주문현황 조회
router.get("/orders", controller.getAdminAllOrders);

// 주문 상세 조회
router.get("/orders/:orderId", controller.getAdminOrder);

// 출고 상태 변경
router.patch("/orders/:orderId", controller.updateOutStatus);

// 거래 취소 - 삭제
router.delete("/orders/:orderId", controller.deleteAdminOrder);

module.exports = router;
