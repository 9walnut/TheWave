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
    const { cartID } = req.params;
    const {} = req.body;
    const editCart = await db.carts.update({}, { where: { cartID } });
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
    const { cartID } = req.params;
    const isDeleted = await db.products.destroy({ where: { cartID } });
    console.log(isDeleted);
    if (isDeleted) return res.send(true);
    else return res.send(false);
  } catch (error) {
    console.error(error);
    res.status(500).send("장바구니 삭제 오류");
  }
};
