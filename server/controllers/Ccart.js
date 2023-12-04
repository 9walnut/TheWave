const { db } = require("../models/index");

// 장바구니 조회
exports.getCart = async (req, res) => {
  try {
    const cart = await db.carts.findAll();
    return res.send(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("장바구니 조회 오류");
  }
};

// 장바구니 수정
// 장바구니에서 수정할 수량 추가 필요
exports.editCart = async (req, res) => {
  try {
    console.log(req.body);
    const { cartId } = req.params;
    const { cartQuantity } = req.body;
    const editCart = await db.carts.update(
      { cartQuantity },
      { where: { cartId } }
    );
    return res.send(editCart);
  } catch (error) {
    console.error(error);
    res.status(500).send("상품 수정 오류");
  }
};

// 장바구니 삭제
exports.deleteCart = async (req, res) => {
  try {
    console.log(req.body);
    const { cartId } = req.params;
    const isDeleted = await db.carts.destroy({ where: { cartId } });
    console.log(isDeleted);
    if (isDeleted) return res.send(true);
    else return res.send(false);
  } catch (error) {
    console.error(error);
    res.status(500).send("장바구니 삭제 오류");
  }
};

// 장바구니 주문하기
exports.getCartCheckout = async (req, res) => {
  try {
    const { userNumber } = req.body;
    const cartItems = await db.carts.findAll({ where: { userNumber } });

    let totalPrice = 0;

    const address = await db.address.findOne({ where: { userNumber } });
    const addressId = address.addressId;

    // 장바구니의 각 항목을 주문 내역에 추가
    for (const item of cartItems) {
      const product = await db.products.findOne({
        where: { productId: item.productId },
      });
      totalPrice += product.productPrice * item.cartQuantity;

      await db.orderdetails.create({
        orderID: newOrder.orderId,
        productID: item.productId,
        productCount: item.cartQuantity,
      });
    }

    // 주문 생성
    const newOrder = await db.orders.create({
      userNumber,
      totalPrice,
      addressId,
    });

    // 장바구니 비우기
    await db.carts.destroy({ where: { userNumber } });

    res.send(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send("장바구니 주문하기 오류");
  }
};
