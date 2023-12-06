const { db } = require("../models/index");

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
