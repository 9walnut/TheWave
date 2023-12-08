const { db } = require("../models/index");
const { comparePw } = require("../middleware/pw");

// 회원 마이페이지
exports.mypage = (req, res) => {
  res.send({ result: true });
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
    const pwCheck = await comparePw(req.session.userId, password);

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
