const {
  db,
  db: { Op },
  sequelize,
} = require("../models/index");
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

// 결제하기(장바구니 결제, 단일 상품 결제 모두)
exports.payment = async (req, res) => {
  // 주문서에서 작성한 정보
  // 여러 상품들에 대한 개별 데이터(color, size, orderQuantity)가 어떤 식으로 넘어올지...
  const {
    userAddress,
    receiveName,
    deliveryRequest,
    productInfo, // 주문할 상품 번호, 카트 번호, (color, size, orderQuantity..?) > 단일 상품 구매인 경우엔 prductInfo로 묶지 않고 productId, color, size, orderQuantity
  } = req.body;
  const accessToken = req.headers["authorization"];

  const t = await sequelize.transaction();

  try {
    const tokenCheck = await verifyToken(accessToken);
    const userNumber = tokenCheck.userData.userNumber;
    console.log("유저넘버", userNumber);

    let newOrder;
    let payment;
    let productOut;

    try {
      // 단일 상품 구매
      if (req.body.productId) {
        console.log("단일 상품 구매");
        const product = await db.products.findOne({
          where: { productId: req.body.productId },
        });

        newOrder = await db.orders.create(
          {
            userNumber: userNumber,
            productId: req.body.productId,
            orderQuantity,
            color,
            size,
            receiveName,
            address: userAddress,
            deliveryRequest,
            totalPrice: product.productPrice * orderQuantity,
            orderQuantity: orderQuantity,
            orderDate: new Date(),
            changeDate: new Date(),
          },
          { t }
        );

        payment = await db.payment.create(
          {
            orderId: newOrder.orderId,
            payPrice: newOrder.totalPrice,
            payMethod: "1",
            isPaid: "0",
            isRefund: "0",
          },
          { t }
        );

        productOut = await db.productout.create(
          {
            orderId: payment.orderId,
            cartId: newOrder.cartId || null, // 단일 상품 구매는 장바구니 없음
            productId: newOrder.productId,
            outStatus: "1",
            outDate: new Date(),
          },
          { t }
        );
      } else {
        console.log("여러 상품 구매");

        // 구매 상품 정보
        let productIds = productInfo.map((item) => item.productId);

        const productsCheck = await db.products.findAll({
          where: { productId: { [Op.in]: productIds } },
        });
        console.log("productsCheck 결과 확인", productsCheck);

        for (let i = 0; i < productInfo.length; i++) {
          newOrder = await db.orders.create(
            {
              userNumber: userNumber,
              receiveName,
              address: userAddress,
              deliveryRequest,
              productId: productsCheck[i].productId,
              cartId: productInfo[i].cartId,
              totalPrice:
                productsCheck[i].productPrice * productInfo[i].orderQuantity, // 주문 수량..
              orderQuantity: productInfo[i].orderQuantity,
              color: productInfo[i].color,
              size: productInfo[i].size,
              orderDate: new Date(),
              orderStatus: "1",
              changeDate: new Date(),
            },
            { t }
          );

          payment = await db.payment.create(
            {
              orderId: newOrder.orderId,
              payPrice: newOrder.totalPrice,
              payMethod: "1",
              isPaid: "0",
              isRefund: "0",
            },
            { t }
          );

          productOut = await db.productout.create(
            {
              orderId: payment.orderId,
              cartId: newOrder.cartId || null,
              productId: newOrder.productId,
              outStatus: "1",
              outDate: new Date(),
            },
            { t }
          );

          // 장바구니 비우기
          await db.carts.update(
            { isDeleted: true },
            { where: { cartId: productInfo[i].cartId } }
          );
        }
      }

      await t.commit();

      if (newOrder) res.json(newOrder);
      else res.send({ result: false });
    } catch (error) {
      await t.rollback();
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("결제하기 오류");
  }
};
