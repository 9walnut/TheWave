const { db } = require("../models/index");

// 결제하기(상품 상세 페이지에서 바로)
exports.goPayment = async (req, res) => {
  try {
    const { guestId, orderQuantity } = req.body;
    const userNumber = req.session.userNumber;

    let userIdForPay;

    if (guestId) {
      userIdForPay = guestId;
    } else if (userNumber) {
      userIdForPay = userNumber;
    } else {
      res.send({ result: "notMember" });
      return;
    }

    const product = await db.products.findOne({
      where: { productId: req.params.productId },
    });
    const address = await db.address.findOne({ where: { userIdForPay } });

    // 주문 생성
    const newOrder = await db.orders.create({
      userNumber: userIdForPay,
      totalPrice: product.productPrice * orderQuantity,
      addressId: address.addressId,
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
    console.err(error);
    res.status(500).send("결제하기 오류");
  }
};

// 결제하기 > 비회원
exports.noMemberPay = async (req, res) => {
  try {
    const { orderQuantity } = req.body;

    // 타임스탬프로 비회원 번호 생성
    function randomGuestId() {
      const timestamp = Date.now();
      const guestId = "guest_" + timestamp;
      return guestId;
    }

    localStorage.setItem("guest", randomGuestId());

    const guest = localStorage.getItem("guest");
    console.log("비회원 번호", guest);

    const product = await db.products.findOne({
      where: { productId: req.params.productId },
    });
    const address = await db.address.findOne({ where: { userIdForPay } });

    const newOrder = await db.orders.create({
      userNumber: guest,
      totalPrice: product.productPrice * orderQuantity,
      addressId: address.addressId,
    });

    // 주문 내역에 상품 추가
    await db.orderdetails.create({
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
