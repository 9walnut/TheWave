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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    res.status(500).send("장바구니 담기 오류");
  }
};

// 결제하기(상품 상세 페이지에서 바로)
exports.goPayment = async (req, res) => {
  try {
    const { userNumber, productCount } = req.body;
    const product = await db.products.findOne({
      where: { productId: req.params.productId },
    });
    const address = await db.address.findOne({ where: { userNumber } });

    // 주문 생성
    const newOrder = await db.orders.create({
      userNumber,
      totalPrice: product.productPrice * productCount,
      addressId: address.addressId,
    });

    // 주문 내역에 상품 추가
    await db.orderdetails.create({
      orderID: newOrder.orderId,
      productID: product.productId,
      productCount: productCount,
    });

    res.send(newOrder);
  } catch (error) {
    console.err(error);
    res.status(500).send("결제하기 오류");
  }
};
