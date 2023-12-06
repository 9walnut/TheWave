const { db } = require("../models/index");

// 카테고리별 상품 정보, 페이지 렌더
exports.categoryPage = async (req, res) => {
  try {
    const categoryPage = await db.categories.findAll({
      where: { categoryId: req.query.categoryId },
      include: {
        model: db.products,
        attributes: [
          "productId",
          "productName",
          "productPrice",
          "productInfo",
          "productStatus",
        ],
      },
    });
    res.json(categoryPage);
  } catch {
    console.error(err);
    res.status(500).send("카테고리 페이지 오류");
  }
};
