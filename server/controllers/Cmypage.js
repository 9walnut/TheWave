const { db } = require("../models/index");
const { comparePw } = require("../middleware/pw");
const { verifyToken } = require("../middleware/jwt");
const jwt = require("jsonwebtoken");

// 회원 마이페이지(마이페이지 렌더 시 바로 주문 내역 노출)
exports.mypage = async (req, res) => {
  try {
    const accessToken = req.headers["authorization"]; // 헤더에서 access 토큰값 받아오기

    const tokenCheck = await verifyToken(accessToken); // 토큰 검증 및 디코딩
    console.log("tokenCheck", tokenCheck);

    if (
      tokenCheck.result !== "no token" &&
      tokenCheck.result !== "signin again"
    ) {
      const decodedToken = jwt.decode(tokenCheck.accessToken);

      const orderList = await db.orders.findAll({
        where: { userNumber: decodedToken.userNumber },
        attributes: [
          "productId",
          "orderDate",
          "orderQuantity",
          "deliveryRequest",
        ],
      });

      if (orderList)
        res.json({ orderList: orderList, accessToken: tokenCheck.accessToken });
      else res.send({ result: true, accessToken: tokenCheck.accessToken }); // 주문 내역 없는 경우
    } else {
      res.send({ result: tokenCheck.result }); // 토큰 검증 실패
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("마이페이지 렌더 오류");
  }
};

// 회원 정보 수정 페이지
exports.editInfoPage = (req, res) => {
  res.send({ result: true });
};

// 회원 정보 수정 페이지 > 비밀번호 인증
exports.editInfoPw = async (req, res) => {
  try {
    const accessToken = req.headers["authorization"];
    const tokenCheck = await verifyToken(accessToken);
    const decodedToken = jwt.decode(tokenCheck.accessToken);
    console.log("decodedToken", decodedToken);

    const pwCheck = await comparePw(decodedToken.userId, req.body.password);

    if (pwCheck) {
      const userInfo = await db.users.findOne({
        where: { userNumber: decodedToken.userNumber },
      });
      res.json({ result: true });
    } else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("비밀번호 인증 오류");
  }
};

// 회원 정보 수정
exports.editInfo = async (req, res) => {
  try {
    const accessToken = req.headers["authorization"];
    const tokenCheck = await verifyToken(accessToken);
    const decodedToken = jwt.decode(tokenCheck.accessToken);

    const editInfo = await db.users.update(req.body, {
      where: { userNumber: decodedToken.userNumber },
    });
    if (editInfo) res.send({ result: true });
    else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("회원 정보 수정 오류");
  }
};

// 회원 탈퇴
exports.deleteUser = async (req, res) => {
  try {
    const accessToken = req.headers["authorization"];
    const tokenCheck = await verifyToken(accessToken);
    const decodedToken = jwt.decode(tokenCheck.accessToken);

    const pwCheck = await comparePw(decodedToken.userId, req.body.password);
    if (pwCheck) {
      await db.users.destroy({
        where: {
          userNumber: decodedToken.userNumber,
        },
      });
      res.send({ result: true });
    } else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("회원 탈퇴 오류");
  }
};
