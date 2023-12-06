const { db } = require("../models/index");

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
