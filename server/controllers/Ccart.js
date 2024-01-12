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
exports.editCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { cartQuantity, color, size } = req.body;
    let updateData = { cartQuantity, color, size };
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
    console.log("장바구니삭제한다고!!!!!!!!!!!!!!!!!!!!!!!!!", req.body);
    const { cartId } = req.body;
    console.log(cartId);
    const isDeleted = await db.carts.destroy({
      where: { cartId: cartId },
    });
    if (isDeleted == true) return res.send({ result: true });
    else return res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("장바구니 삭제 오류");
  }
};

// 장바구니 구매하기 버튼 - 주문 정보 페이지로 정보 발송
exports.payCart = async (req, res) => {
  // console.log("장바구니결제한다", req.body);
  // const { cartIds } = req.body;
  // const accessToken = req.headers["authorization"];
  // try {
  //   const { cartIds } = req.body.cartId;
  //   const isChecked = await db.carts.update(
  //     { isChecked: 1 },
  //     { where: { cartId: { [Op.in]: cartIds } } }
  //   );
  //   const tokenCheck = await verifyToken(accessToken);
  //   const userNumber = tokenCheck.userData.userNumber;

  //   const userInfo = await db.users.findOne({
  //     where: { userNumber: userNumber },
  //     attributes: ["userName", "phoneNumber"],
  //   });

  //   const userAddress = await db.address.findOne({
  //     where: { userNumber: userNumber },
  //     attributes: ["address"],
  //   });

  //   const productInfo = await db.carts.findAll({
  //     where: { cartId: { [Op.in]: cartIds }, isChecked: 1 },
  //     attributes: ["productId", "cartId"],
  //   });

  //   if (userInfo && userAddress) {
  //     res.json({
  //       userInfo,
  //       userAddress,
  //       productInfo,
  //       cartQuantity,
  //       productInfo,
  //       color,
  //       size,
  //     });
  //     if (isChecked[0] > 0) return res.send(true);
  //   } else res.send({ result: false });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send("주문 정보 불러오기 오류");
  // }

  console.log("장바구니 결제한다", req.body);
  const { cartItems } = req.body; // 수정된 부분

  try {
    // 전달 받은 cartItem 배열을 이용하여 각 항목 업데이트
    for (const item of cartItems) {
      const { cartId, cartQuantity, color, size } = item;
      await db.carts.update(
        { isChecked: 1, cartQuantity, color, size },
        { where: { cartId } }
      );
    }

    const accessToken = req.headers["authorization"];
    const tokenCheck = await verifyToken(accessToken);
    const userNumber = tokenCheck.userData.userNumber;

    const userInfo = await db.users.findOne({
      where: { userNumber },
      attributes: ["userName", "phoneNumber"],
    });

    const carts = await db.carts.findAll({
      where: { userNumber },
    });

    const address = await db.address.findOne({
      where: { userNumber },
      attributes: ["address"],
    });

    const userAddress = address.address ? address.address.split("/") : [];
    console.log("userAddress", userAddress);

    const productInfo = await db.carts.findAll({
      where: {
        cartId: { [Op.in]: cartItems.map((item) => item.cartId) },
        isChecked: 1,
      },
      attributes: ["productId", "cartId"],
    });

    if (userInfo && userAddress) {
      res.json({
        userInfo,
        userAddress,
        productInfo,
        productInfo,
        carts,
        result: true,
      });
    } else {
      res.json({
        result: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("주문 정보 불러오기 오류");
  }
};
