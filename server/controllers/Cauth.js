const { createHash } = require("crypto");
const { db } = require("../models/index");
const { hashedPwWithSalt, comparePw } = require("../middleware/pw");

// 메인 페이지 렌더
exports.main = (req, res) => {
  res.send({ result: true });
};

// 로그인 페이지 랜더
exports.loginPage = (req, res) => {
  res.send({ result: true });
};

// '로그인' 버튼 클릭 시
exports.loginUser = async (req, res) => {
  try {
    const loginUser = await db.users.findOne({
      where: { userId: req.body.userId },
    });

    const { userId, password } = req.body;
    const pwCheck = await comparePw(userId, password);

    if (loginUser && pwCheck) {
      req.session.userNumber = loginUser.userNumber; // 로그인 성공 시 session에 userNumber 저장
      req.session.userId = loginUser.userId;
      res.send({ result: true });
    } else res.send({ result: false });
  } catch (error) {
    console.error(err);
    res.status(500).send("로그인 오류");
  }
};

// 회원가입 페이지 렌더
exports.registerPage = (req, res) => {
  res.send({ result: true });
};

// '회원가입' 버튼 클릭 시
exports.register = async (req, res) => {
  try {
    const { userId, userPw, userName, phoneNumber, birthday, gender, address } =
      req.body;

    const checkInfo = await db.users.findOne({
      where: {
        userId: userId,
        phoneNumber: phoneNumber,
      },
    });

    if (!checkInfo) {
      const { password, salt } = await hashedPwWithSalt(userPw); // 암호화
      const userInfo = await db.users.create({
        userId: userId,
        password: password,
        passwordSalt: salt,
        userName: userName,
        phoneNumber: phoneNumber,
        birthday: birthday,
        gender: gender,
        address: address,
      });
      res.send({ result: true });
    } else {
      res.json(checkInfo);
    }
  } catch (error) {
    console.error(err);
    res.status(500).send("회원가입 오류");
  }
};

// 아이디 찾기 페이지 렌더
exports.findIdPage = (req, res) => {
  res.send({ result: true });
};

// '아이디 찾기' 버튼 클릭 시
exports.findId = async (req, res) => {
  try {
    const findId = await db.users.findOne({
      where: {
        userName: req.body.userName,
        phoneNumber: req.body.phoneNumber,
      },
    });

    if (findId) res.json(findId);
    else res.send({ result: false }); // 아이디 찾기 실패 시 false 반환
  } catch (error) {
    console.error(err);
    res.status(500).send("아이디 찾기 오류");
  }
};

// 비밀번호 찾기 페이지 렌더
exports.findIdPage = (req, res) => {
  res.send({ result: true });
};

// '비밀번호 찾기' 버튼 클릭 시
exports.findPw = async (req, res) => {
  try {
    const findPw = await db.users.findOne({
      where: {
        userId: req.body.userId,
        phoneNumber: req.body.phoneNumber,
      },
    });
    if (findPw) res.send({ result: true });
    else res.send({ result: false });
  } catch (error) {
    console.error(err);
    res.status(500).send("비밀번호 찾기 오류");
  }
};

// 비밀번호 재설정
exports.newPw = async (req, res) => {
  try {
    const { password, salt } = await hashedPwWithSalt(req.body.password);
    const newPw = await db.users.update(
      {
        password: password,
        passwordSalt: salt,
      },
      {
        where: { userId: req.body.userId }, // 유저 아이디와 일치하는 컬럼에서 비번 업데이트
      }
    );
    res.send({ result: true });
  } catch (error) {
    console.error(err);
    res.status(500).send("비밀번호 재설정 오류");
  }
};

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
    const pwCheck = await comparePw(req.session.userId, password);

    if (pwCheck) res.send({ result: true });
    else res.send({ result: false });
  } catch (error) {
    console.error(err);
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
    res.send({ result: true });
  } catch (error) {
    console.error(err);
    res.status(500).send("회원 정보 수정 오류");
  }
};

// 회원 탈퇴
exports.deleteUser = async (req, res) => {
  try {
    const pwCheck = await comparePw(req.session.userId, password);

    if (pwCheck) {
      const deleteUser = await db.users.destroy({
        where: {
          userNumber: req.session.userNumber,
        },
      });
      res.send({ result: true });
    } else {
      res.send({ result: false });
    }
  } catch (error) {
    console.error(err);
    res.status(500).send("회원 탈퇴 오류");
  }
};
