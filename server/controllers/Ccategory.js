const { db } = require("../models/index");

// 베스트 상품
exports.bestPage = async (req, res) => {
  try {
    console.log(req.params);

    const bestProducts = await db.products.findAll({
      // 실제 등록 상품 등록 후 아이디 수정
      where: { productId: [21, 28, 29] },
      attributes: [
        "productId",
        "productName",
        "productPrice",
        "productInfo",
        "productStatus",
        "thumbnailUrl",
      ],
    });

    res.json(bestProducts);
    console.log(bestProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("베스트 상품 페이지 오류");
  }
};

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
          "thumbnailUrl",
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
