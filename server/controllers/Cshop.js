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

// 장바구니 담기
exports.cartIn = async (req, res) => {
  try {
    const userNumber = req.session.userNumber;
    const productId = req.params.productId;
    const cartId = req.body.cartId;
    const cartQuantity = req.body.cartQuantity;

    const cartIn = await db.carts.create({
      productId: productId,
      cartId: cartId,
      userNumber: userNumber,
      cartQuantity: cartQuantity,
    });
    if (cartIn) res.send({ result: true });
    else res.send({ result: false });
  } catch (error) {
    console.error(err);
    res.status(500).send("장바구니 담기 오류");
  }
};

// 결제하기(상품 상세 페이지에서 바로)
exports.goPayment = async (req, res) => {
  try {
    const productInfo = await db.products.findOne({
      where: { productId: req.params.productId },
    });
    res.json(productInfo);
  } catch (error) {
    console.err(err);
    res.status(500).send("결제하기 오류");
  }
};
