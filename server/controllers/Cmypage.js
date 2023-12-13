const { db } = require("../models/index");
const { comparePw } = require("../middleware/pw");
const { verifyToken } = require("../middleware/jwt");
const { decode } = require("jsonwebtoken");

// 회원 마이페이지(마이페이지 렌더 시 바로 주문 내역 노출)
exports.mypage = async (req, res) => {
  try {
    const accessToken = req.headers.authorization;
    console.log("accessToken", accessToken);
    if (accessToken) {
      const token = accessToken.split(" ")[1];
      const verify = verifyToken(token); // 토큰 검증

      console.log("token", token);
      console.log("verify", verify);
      if (verify) {
        const decodeToken = decode(token);
        console.log("decodeToken", decodeToken);
      }

      const orderList = await db.orders.findAll({
        where: { userNumber: req.session.userNumber },
        attributes: ["productId", "orderDate", "totalPrice", "deliveryRequest"],
      });
      if (orderList) res.json(orderList);
      else res.send({ result: true }); // 주문 내역 없는 경우
    } else {
      // 토큰이 오지 않은 경우
      res.send({ result: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("마이페이지 렌더 오류");
  }
};

// 회원 정보 수정 페이지
exports.editInfo = (req, res) => {
  res.send({ result: true });
};

// 회원 정보 수정 페이지 > 비밀번호 인증
exports.editInfoPw = async (req, res) => {
  try {
    const pwCheck = await comparePw(req.session.userId, req.body.password);

    if (pwCheck) res.send({ result: true });
    else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("비밀번호 인증 오류");
  }
};

// 회원 정보 수정
exports.editInfo = async (req, res) => {
  try {
    const editInfo = await db.users.update(req.body, {
      where: {
        userNumber: req.session.userNumber,
      },
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
    const pwCheck = await comparePw(req.session.userId, req.body.password);

    if (pwCheck) {
      await db.users.destroy({
        where: {
          userNumber: req.session.userNumber,
        },
      });
      res.send({ result: true });
    } else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("회원 탈퇴 오류");
  }
};
