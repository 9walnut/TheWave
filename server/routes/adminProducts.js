const express = require("express");
const router = express.Router();
const { thumbnailUpload, detailUpload } = require("../middleware/imageUpload");
const controller = require("../controllers/CadminProducts");

// 전체 등록상품 조회
router.get("/", controller.getAdminAllProducts);

// 등록 상품 삭제 - 체크 박스
router.delete("/", controller.deleteAdminProductsChecked);

// 상품 등록
router.post("/add", controller.createAdminProduct);

// 상품 등록 - 썸네일 사진 등록
router.post(
  "/add/thumbnail",
  thumbnailUpload.single("thumbnailUrl"),
  controller.uploadThumbnail
);

// 상품 등록 - 상세 사진 등록
router.post(
  "/add/detail",
  detailUpload.array("detailUrls", 10),
  controller.uploadDetails
);

// 등록상품 상세 조회
router.get("/:productId", controller.getAdminProduct);

// 등록 상품 수정
router.patch("/:productId/edit", controller.editAdminProduct);

// 썸네일 사진 수정
router.patch(
  "/:productId/edit/thumbnail",
  thumbnailUpload.array("thumbnailUrl"),
  controller.editThumbnail
);

// 상세 사진 수정
router.patch(
  "/:productId/edit/detail",
  detailUpload.array("detailUrls"),
  controller.editDetails
);

// 등록 상품 삭제 - 상세 조회 페이지 내부
router.delete("/:productId", controller.deleteAdminProduct);

module.exports = router;
