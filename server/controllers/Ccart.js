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
        include: [
          {
            model: db.products,
            as: "product",
            required: true,
            include: [
              {
                model: db.productoption,
                as: "productoption",
              },
            ],
          },
        ],
      });
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
// ------------ 이게 과연 필요할까 고민 --------------
exports.editCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { cartQuantity, color, size } = req.body; // 옵션 정보 추가
    let updateData = { cartQuantity, color, size }; // 수정할 데이터에 옵션 정보 포함
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

// 장바구니 구매하기 버튼 - 주문 정보 페이지로 정보 발송
exports.payCart = async (req, res) => {
  const { cartQuantity, color, size } = req.body;
  const accessToken = req.headers["authorization"];
  try {
    const { cartIds } = req.body.cartId;
    const isChecked = await db.carts.update(
      { isChecked: 1 },
      { where: { cartId: { [Op.in]: cartIds } } }
    );
    const tokenCheck = await verifyToken(accessToken);
    const userNumber = tokenCheck.userData.userNumber;

    const userInfo = await db.users.findOne({
      where: { userNumber: userNumber },
      attributes: ["userName", "phoneNumber"],
    });

    const userAddress = await db.address.findOne({
      where: { userNumber: userNumber },
      attributes: ["address"],
    });

    const productInfo = await db.carts.findAll({
      where: { cartId: { [Op.in]: cartIds }, isChecked: 1 },
      attributes: ["productId", "cartId"],
    });

    if (userInfo && userAddress) {
      res.json({
        userInfo,
        userAddress,
        productInfo,
        cartQuantity,
        productInfo,
        color,
        size,
      });
      if (isChecked[0] > 0) return res.send(true);
    } else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("주문 정보 불러오기 오류");
  }
};
