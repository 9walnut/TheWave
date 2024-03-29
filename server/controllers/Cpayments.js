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

    const address = await db.address.findOne({
      where: { userNumber: userNumber },
      attributes: ["address"],
    });

    const userAddress = address.address ? address.address.split("/") : [];

    const productInfo = await db.products.findOne({
      where: { productId: productId },
      attributes: ["productId", "productName", "thumbnailUrl", "productPrice"],
    });

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
  const {
    userAddress,
    receiveName,
    deliveryRequest,
    productInfo,
    color,
    size,
    orderQuantity,
  } = req.body;
  // 주문서에서 작성한 정보

  const accessToken = req.headers["authorization"];

  const t = await sequelize.transaction();

  try {
    const tokenCheck = await verifyToken(accessToken);
    const userNumber = tokenCheck.userData.userNumber;

    let newOrder;
    let payment;
    let productOut;

    try {
      // 단일 상품 구매
      if (productInfo.length === 1) {
        const product = await db.products.findOne({
          where: { productId: productInfo[0].productId },
        });

        newOrder = await db.orders.create(
          {
            userNumber,
            productId: productInfo[0].productId,
            orderQuantity: orderQuantity,
            color: color,
            size: size,
            receiveName,
            address: userAddress,
            deliveryRequest,
            totalPrice: product.productPrice * orderQuantity,
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
        // 구매 상품 정보
        let productIds = productInfo.map((item) => item.productId);

        const productsCheck = await db.products.findAll({
          where: { productId: { [Op.in]: productIds } },
        });

        for (let i = 0; i < productInfo.length; i++) {
          newOrder = await db.orders.create(
            {
              userNumber,
              receiveName,
              address: userAddress,
              deliveryRequest,
              productId: productsCheck[i].productId,
              cartId: productInfo[i].cartId,
              totalPrice:
                productsCheck[i].productPrice * productInfo[i].orderQuantity,
              orderQuantity: productInfo[i].orderQuantity,
              color: productInfo[i].productoption.color[0],
              size: productInfo[i].productoption.size[0],
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
              orderId: newOrder.orderId,
              cartId: newOrder.cartId,
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

exports.cartPayment = async (req, res) => {
  const {
    userAddress,
    receiveName,
    deliveryRequest,
    cartItems, // 변경된 부분: cartItems로 받음
  } = req.body;

  const accessToken = req.headers["authorization"];
  const t = await sequelize.transaction();

  try {
    const tokenCheck = await verifyToken(accessToken);
    const userNumber = tokenCheck.userData.userNumber;

    let newOrders = [];
    let payment;
    let productOut;

    try {
      for (const cartItem of cartItems) {
        const product = await db.products.findOne({
          where: { productId: cartItem.productId },
        });

        const newOrder = await db.orders.create(
          {
            userNumber,
            productId: cartItem.productId,
            orderQuantity: cartItem.cartQuantity,
            color: cartItem.color,
            size: cartItem.size,
            receiveName,
            address: userAddress, // 주소 정보를 문자열로 합침
            deliveryRequest,
            totalPrice: product.productPrice * cartItem.cartQuantity,
            orderDate: new Date(),
            changeDate: new Date(),
          },
          { transaction: t }
        );

        newOrders.push(newOrder);

        payment = await db.payment.create(
          {
            orderId: newOrder.orderId,
            payPrice: newOrder.totalPrice,
            payMethod: "1",
            isPaid: "0",
            isRefund: "0",
          },
          { transaction: t }
        );

        productOut = await db.productout.create(
          {
            orderId: newOrder.orderId,
            cartId: newOrder.cartId || null,
            productId: newOrder.productId,
            outStatus: "1",
            outDate: new Date(),
          },
          { transaction: t }
        );
      }

      await t.commit();

      if (newOrders.length > 0) {
        res.json(newOrders);
      } else {
        res.send({ result: false });
      }
    } catch (error) {
      await t.rollback();
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("결제하기 오류");
  }
};
