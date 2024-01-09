const { db } = require("../models/index");
const { comparePw, hashedPwWithSalt } = require("../middleware/pw");
const { verifyToken } = require("../middleware/jwt");

// 회원 마이페이지(마이페이지 렌더 시 바로 주문 내역 노출)
exports.mypage = async (req, res) => {
  const accessToken = req.headers["authorization"]; // 헤더에서 access 토큰값 받아오기
  try {
    const tokenCheck = await verifyToken(accessToken); // 토큰 검증 및 디코딩
    console.log("tokenCheck", tokenCheck);

    if (
      tokenCheck.result !== "no token" &&
      tokenCheck.result !== "signin again"
    ) {
      const orderList = await db.orders.findAll({
        where: { userNumber: tokenCheck.userData.userNumber },
        attributes: [
          "productId",
          "orderDate",
          "orderQuantity",
          "deliveryRequest",
          "totalPrice",
          "orderDate",
          "orderStatus",
        ],
        include: [
          {
            model: db.products,
            as: "product",
            attributes: ["productName", "productPrice", "thumbnailUrl"],
          },
        ],
      });

      const userName = await db.users.findOne({
        where: { userNumber: tokenCheck.userData.userNumber },
        attributes: ["userName"],
      });

      if (orderList)
        res.json({
          userName,
          orderList: orderList,
          accessToken: tokenCheck.accessToken,
        });
      else res.send({ result: true, accessToken: tokenCheck.accessToken }); // 주문 내역 없는 경우
    } else {
      res.send({ result: tokenCheck.result }); // 토큰 검증 실패
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("마이페이지 렌더 오류");
  }
};

// 위시리스트(찜한 상품)
exports.wishList = async (req, res) => {
  const accessToken = req.headers["authorization"];
  try {
    const tokenCheck = await verifyToken(accessToken);

    if (
      tokenCheck.result !== "no token" &&
      tokenCheck.result !== "signin again"
    ) {
      const wishList = await db.wishlist.findAll({
        where: { userNumber: tokenCheck.userData.userNumber },
        include: [
          {
            model: db.products,
            as: "product",
            attributes: [
              "productName",
              "productPrice",
              "thumbnailUrl",
              "productStatus",
              "isDeleted",
            ],
          },
        ],
      });
      res.json(wishList);
    } else res.send({ result: false }); // 찜한 목록 없는 경우
  } catch (error) {
    console.error(error);
  }
};

// 찜한 상품 장바구니 담기 (담고 나서도 찜한 상품에서는 사라지지 않음)
exports.wishToCart = async (req, res) => {
  const accessToken = req.headers["authorization"];
  console.log("마바디", req.body);
  const { productId } = req.body.data;

  try {
    const tokenCheck = await verifyToken(accessToken);

    // 판매 중인 상품인지 확인
    const productIsDeleted = await db.products.findOne({
      where: { productId: productId },
      attributes: ["isDeleted"],
    });
    console.log("productIsDeleted", productIsDeleted);

    if (productIsDeleted === true) {
      res.send({ result: false });
    } else {
      const cartIn = await db.carts.create({
        userNumber: tokenCheck.userData.userNumber,
        productId: productId,
        cartQuantity: "1", // 기본적으로 수량 1
        isChecked: "0",
      });

      res.send({ result: true }); // 장바구니 담기 성공
    }
  } catch (error) {
    console.error(error);
  }
};

// 찜한 상품 삭제
exports.deleteWish = async (req, res) => {
  const accessToken = req.headers["authorization"];
  console.log("찜상품삭제", req.body);
  const { productId } = req.body;
  console.log(productId);
  try {
    const tokenCheck = await verifyToken(accessToken);

    const cartOut = await db.wishlist.destroy({
      where: {
        userNumber: tokenCheck.userData.userNumber,
        productId: productId,
      },
    });

    res.send({ result: cartOut });
  } catch (error) {
    console.error(error);
  }
};

// 회원 정보 수정 페이지
exports.editInfoPage = (req, res) => {
  // res.send({ result: true })
};

// 회원 정보 수정 페이지 > 비밀번호 인증
exports.editInfoPw = async (req, res) => {
  const accessToken = req.headers["authorization"];
  try {
    const tokenCheck = await verifyToken(accessToken);

    const pwCheck = await comparePw(
      tokenCheck.userData.userId,
      req.body.password
    );

    if (pwCheck) {
      const userInfo = await db.users.findOne({
        where: { userNumber: tokenCheck.userData.userNumber },
      });

      const userAddress = await db.address.findOne({
        where: { userNumber: tokenCheck.userData.userNumber },
      });

      res.send({ result: true, userInfo, userAddress });
    } else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("비밀번호 인증 오류");
  }
};

// 회원 정보 수정
exports.editInfo = async (req, res) => {
  const accessToken = req.headers["authorization"];
  const tokenCheck = await verifyToken(accessToken);
  try {
    const editInfo = await db.users.update(req.body, {
      where: { userNumber: tokenCheck.userData.userNumber },
    });

    const editAddress = await db.address.update(
      { address: req.body.address },
      { where: { userNumber: tokenCheck.userData.userNumber } }
    );

    if (editInfo && editAddress) res.send({ result: true });
    else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("회원 정보 수정 오류");
  }
};

// 회원 비밀번호 수정
exports.editPw = async (req, res) => {
  const accessToken = req.headers["authorization"];
  console.log(req.body);
  const { newPassword } = req.body;
  console.log(newPassword, "newpwpwpwpw");
  const tokenCheck = await verifyToken(accessToken);

  try {
    const { userPw, salt } = await hashedPwWithSalt(newPassword);
    const editPw = await db.users.update(
      {
        password: userPw,
        passwordSalt: salt,
      },
      { where: { userNumber: tokenCheck.userData.userNumber } }
    );
    console.log("editPw 결과", editPw);
    if (editPw == 1) {
      res.send({ result: true });
    } else {
      res.send({ result: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("비밀번호 수정 오류");
  }
};

// 회원 탈퇴
exports.deleteUser = async (req, res) => {
  try {
    const accessToken = req.headers["authorization"];
    const tokenCheck = await verifyToken(accessToken);

    const pwCheck = await comparePw(
      tokenCheck.userData.userId,
      req.body.password
    );
    if (pwCheck) {
      await db.users.destroy({
        where: {
          userNumber: tokenCheck.userData.userNumber,
        },
      });
      res.send({ result: true });
    } else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("회원 탈퇴 오류");
  }
};
