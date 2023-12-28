const { db } = require("../models/index");

// 카테고리별 상품 정보, 페이지 렌더
exports.categoryPage = async (req, res) => {
  try {
    console.log(req.params);

    const categoryPage = await db.categories.findAll({
      where: { categoryId: req.params.categoryId },
      attributes: ["categoryName"],

      include: {
        model: db.products,
        as: "products",
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
    console.log(categoryPage);
  } catch (error) {
    console.error(error);
    res.status(500).send("카테고리 페이지 오류");
  }
};
