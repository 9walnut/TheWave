const { db } = require("../models/index");
const { comparePw } = require("../middleware/pw");
const { decodeToken } = require("../middleware/jwt");

// 회원 마이페이지(마이페이지 렌더 시 바로 주문 내역 노출)
exports.mypage = async (req, res) => {
  try {
    const accessToken = req.headers["authorization"]; // 헤더에서 토큰값 받아오기
    console.log("accessToken", accessToken);

    const tokenCheck = decodeToken(accessToken); // 토큰 검증 및 디코딩

    if (tokenCheck) {
      const orderList = await db.orders.findAll({
        where: { userNumber: tokenCheck.userNumber },
        attributes: [
          "productId",
          "orderDate",
          "orderQuantity",
          "deliveryRequest",
        ],
      });

      if (orderList) res.json(orderList);
      else res.send({ result: true }); // 주문 내역 없는 경우
    } else {
      res.send({ result: false }); // 토큰 검증 실패
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
    const tokenCheck = decodeToken(accessToken);

    console.log("tokenCheck", tokenCheck);

    const pwCheck = await comparePw(tokenCheck.userId, req.body.password);

    if (pwCheck) {
      const userInfo = await db.users.findOne({
        where: { userNumber: tokenCheck.userNumber },
      });
      res.json(userInfo);
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
    const tokenCheck = decodeToken(accessToken);

    const editInfo = await db.users.update(req.body, {
      where: { userNumber: tokenCheck.userNumber },
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
    const tokenCheck = decodeToken(accessToken);

    const pwCheck = await comparePw(tokenCheck.userId, req.body.password);
    if (pwCheck) {
      await db.users.destroy({
        where: {
          userNumber: tokenCheck.userNumber,
        },
      });
      res.send({ result: true });
    } else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("회원 탈퇴 오류");
  }
};
