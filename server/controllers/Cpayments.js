const { db } = require("../models/index");

// 결제하기(상품 상세 페이지에서 바로)
exports.goPayment = async (req, res) => {
  try {
    const { orderQuantity } = req.body;
    const userNumber = req.session.userNumber;

    const product = await db.products.findOne({
      where: { productId: req.params.productId },
    });

    console.log("product.productId", product.productId);

    const address = await db.address.findOne({
      where: { userNumber: userNumber },
    });

    // 주문 생성
    const newOrder = await db.orders.create({
      userNumber: userNumber,
      totalPrice: product.productPrice * orderQuantity,
      addressId: address.addressId,
      productId: product.productId,
      orderQuantity: orderQuantity,
    });

    if (newOrder) res.send(newOrder);
    else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("결제하기 오류");
  }
};

// 결제하기 > 비회원
exports.noMemberPay = async (req, res) => {
  try {
    const { orderQuantity, guestId, address } = req.body;

    const product = await db.products.findOne({
      where: { productId: req.params.productId },
    });

    const guestAddress = await db.address.create({
      userNumber: guestId,
      address: address,
    });

    const newOrder = await db.orders.create({
      userNumber: guestId,
      totalPrice: product.productPrice * orderQuantity,
      addressId: guestAddress.addressId,
    });

    // 주문 내역에 상품 추가
    await db.orders.create({
      orderID: newOrder.orderId,
      productID: product.productId,
      orderQuantity: orderQuantity,
    });

    if (newOrder) res.send(newOrder);
    else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("비회원 결제하기 오류");
  }
};

// 타임스탬프로 비회원 번호 생성
// function randomGuestId() {
//   const timestamp = Date.now();
//   const guestId = "guest_" + timestamp;
//   return guestId;
// }

// localStorage.setItem("guest", randomGuestId());

// const guest = localStorage.getItem("guest");
// console.log("비회원 번호", guest);
