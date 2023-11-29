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
    res.render("products", categoryPage);
  } catch {
    console.error(err);
    res.status(500).send("카테고리 페이지 오류");
  }
};

// 특정 상품 상세 페이지
exports.productPage = async (req, res) => {
  try {
    const productDetail = await db.products.findOne({
      where: { productId: req.params.productId },
    });
    res.send(productDetail);
  } catch (error) {
    console.error(err);
    res.status(500).send("상품 상세 페이지 오류");
  }
};

// 장바구니 담기
exports.cartIn = async (req, res) => {
  try {
    const cartIn = await db.carts.create({
      productId: req.params.productId,
      cartId: req.body.cartId,
    });
    res.send(cartIn);
  } catch (error) {
    console.error(err);
    res.status(500).send("장바구니 담기 오류");
  }
};

// 결제하기 (일단 보류...)
exports.payment = async (req, res) => {
  try {
    res.render("mypage", result);
  } catch (error) {
    console.err(err);
    res.status(500).send("결제하기 오류");
  }
};
