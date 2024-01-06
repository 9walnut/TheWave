const {
  db,
  db: { Op },
} = require("../models/index");
const { verifyToken } = require("../middleware/jwt");

// 장바구니 조회
exports.getCart = async (req, res) => {
  try {
    // 회원인 경우
    console.log(req.query.result);
    if (req.query.result == "true") {
      const accessToken = req.headers["authorization"];
      const tokenCheck = await verifyToken(accessToken);

      console.log("넌 회원");

      cart = await db.carts.findAll({
        where: { userNumber: tokenCheck.userData.userNumber },
      });
      console.log("cart", cart);
    } else {
      // 비회원인 경우
      console.log("넌 비회원");
      cart = req.body.cart || [];
    }
    return res.send(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("장바구니 조회 오류");
  }
};

// 장바구니 수정
exports.editCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    console.log("req.params", req.params);
    const { cartQuantity, color, size, deliveryHope } = req.body; // 옵션 정보 추가
    let updateData = { cartQuantity, color, size, deliveryHope }; // 수정할 데이터에 옵션 정보 포함
    const editCart = await db.carts.update(updateData, { where: { cartId } });
    return res.send(editCart);
  } catch (error) {
    console.error(error);
    res.status(500).send("상품 수정 오류");
  }
};

// 장바구니 삭제
exports.deleteCart = async (req, res) => {
  try {
    const { cartIds } = req.body.cartId;
    const isDeleted = await db.carts.update(
      { isDeleted: true },
      { where: { cartId: { [Op.in]: cartIds } } }
    );
    if (isDeleted[0] > 0) return res.send(true);
    else return res.send(false);
  } catch (error) {
    console.error(error);
    res.status(500).send("장바구니 삭제 오류");
  }
};

// 장바구니 결제하기 버튼
// cartItems는 체크박스 체크된 항목
exports.payCart = async (req, res) => {
  try {
    const { userNumber, cartItems } = req.body;
    const t = await db.sequelize.transaction();

    try {
      for (let i = 0; i < cartItems.length; i++) {
        const { cartId, quantity, color, size, deliveryHope } = cartItems[i];

        const cart = await db.carts.findOne(
          { where: { cartId, userNumber } },
          { transaction: t }
        );
        if (!cart || cart.isDeleted) {
          throw new Error(`Cart not found: ${cartId}`);
        }

        const productOption = await db.productoption.findOne(
          { where: { productId: cart.productId, color, size } }, // deliveryHope 조건 제거
          { transaction: t }
        );

        const order = await db.orders.create(
          {
            userNumber,
            cartId,
            productId: cart.productId,
            orderQuantity: quantity,
            color,
            size,
            deliveryRequest: deliveryHope,
            orderDate: new Date(),
            orderStatus: 1,
            changeDate: new Date(),
          },
          { transaction: t }
        );

        // 결제가 완료되면 장바구니 제거
        // await cart.update({ isDeleted: true }, { transaction: t });
      }

      await t.commit();
      res.send(true);
    } catch (error) {
      await t.rollback();
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("결제 오류");
  }
};
