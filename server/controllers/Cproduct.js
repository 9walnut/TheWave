const { db } = require("../models/index");

// 특정 상품 상세 페이지
exports.productPage = async (req, res) => {
  try {
    const productDetail = await db.products.findOne({
      where: { productId: req.params.productId },
    });
    res.json(productDetail);
  } catch (error) {
    console.error(err);
    res.status(500).send("상품 상세 페이지 오류");
  }
};
