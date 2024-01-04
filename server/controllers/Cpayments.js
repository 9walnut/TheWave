const { db } = require("../models/index");
const { verifyToken } = require("../middleware/jwt");

// 상품 상세 페이지 구매하기 버튼
// 주문 상품 정보, 주문자 정보 반환
exports.goPayment = async (req, res) => {
  const { orderQuantity, color, size } = req.body;
  const productId = req.params.productId;
  const accessToken = req.headers["authorization"];
  try {
    const tokenCheck = await verifyToken(accessToken);
    const userNumber = tokenCheck.userData.userNumber;

    const userInfo = await db.users.findOne({
      where: { userNumber: userNumber },
      attributes: ["userName", "phoneNumber"],
    });
    console.log("userInfo", userInfo);

    const userAddress = await db.address.findOne({
      where: { userNumber: userNumber },
      attributes: ["address"],
    });
    console.log("userAddress", userAddress);

    const productInfo = await db.products.findOne({
      where: { productId: productId },
      attributes: ["productName", "thumbnailUrl", "productPrice"],
    });
    console.log("productInfo", productInfo);

    if (userInfo && userAddress) {
      res.json({
        userInfo,
        userAddress,
        productInfo,
        orderQuantity,
        color,
        size,
      });
    } else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("주문 정보 불러오기 오류");
  }
};

// 상품 상세 페이지 > 주문 정보 > 결제하기
exports.payment = async (req, res) => {
  const { orderQuantity, color, size, address, receiveName, deliveryRequest } =
    req.body;
  const accessToken = req.headers["authorization"];
  try {
    const tokenCheck = await verifyToken(accessToken);
    const userNumber = tokenCheck.userData.userNumber;
    console.log("유저넘버", userNumber);

    const product = await db.products.findOne({
      where: { productId: req.params.productId },
    });
    console.log("product", product);

    // 장바구니 담지 않고 바로 구매이므로 cartId 없음
    const newOrder = await db.orders.create({
      userNumber: userNumber,
      productId: req.params.productId,
      orderQuantity: orderQuantity,
      color: color,
      size: size,
      receiveName: receiveName,
      address: address,
      deliveryRequest: deliveryRequest,
      totalPrice: product.productPrice * orderQuantity,
      productId: product.productId,
      orderQuantity: orderQuantity,
      orderDate: new Date(),
      changeDate: new Date(),
    });

    if (newOrder) res.send(newOrder);
    else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("결제하기 오류");
  }
};

// 결제하기 > 비회원
// exports.noMemberPay = async (req, res) => {
//   try {
//     const { orderQuantity, guestId, address } = req.body;

//     const product = await db.products.findOne({
//       where: { productId: req.params.productId },
//     });

//     const guestAddress = await db.address.create({
//       userNumber: guestId,
//       address: address,
//     });

//     const newOrder = await db.orders.create({
//       userNumber: guestId,
//       totalPrice: product.productPrice * orderQuantity,
//       addressId: guestAddress.addressId,
//     });

//     // 주문 내역에 상품 추가
//     await db.orders.create({
//       orderId: newOrder.orderId,
//       productId: product.productId,
//       orderQuantity: orderQuantity,
//     });

//     if (newOrder) res.send(newOrder);
//     else res.send({ result: false });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("비회원 결제하기 오류");
//   }
// };
