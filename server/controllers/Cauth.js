const { db } = require("../model/index");

// 메인 페이지 렌더
exports.main = (req, res) => {
  res.render("main");
};

// 로그인 페이지 랜더
exports.loginPage = (req, res) => {
  res.render("login");
};

// '로그인' 버튼 클릭 시(session 저장)
exports.loginUser = async (req, res) => {
  const loginUser = await db.user.findOne({
    where: {
      userId: req.body.userId,
      password: req.body.password,
      // passwordSalt:
    },
  });
  return res.send(loginUser);
};

// 회원가입 페이지 렌더
exports.registerPage = (req, res) => {
  res.render("register");
};

// '회원가입' 버튼 클릭 시 (중복되는 아이디 있는 경우, 회원가입 오류 보내기)
exports.register = async (req, res) => {
  try {
    const userInfo = await db.user.create({
      where: {
        userId: req.body.userId,
        password: req.body.password,
        userName: req.body.userName,
        phoneNumber: req.body.phoneNumber,
        birthday: req.body.birthday,
        isAdmin: req.body.isAdmin,
        gender: req.body.gender,
        address: req.body.address,
      },
    });
    return res.send(userInfo);
  } catch (error) {
    console.error(err);
    res.status(500).send("회원가입 오류");
  }
};

// 아이디 찾기 페이지 렌더
exports.findIdPage = (req, res) => {
  res.render("findId");
};

// '아이디 찾기' 버튼 클릭 시
exports.findId = async (req, res) => {
  try {
    const findId = await db.user.findOne({
      where: {
        userName: req.body.userName,
        phoneNumber: req.body.phoneNumber,
      },
    });
    return res.send(findId);
  } catch (error) {
    console.error(err);
    res.status(500).send("아이디 찾기 오류");
  }
};

// 비밀번호 찾기 페이지 렌더
exports.findIdPage = (req, res) => {
  res.render("findPw");
};

// '비밀번호 찾기' 버튼 클릭 시
exports.findPw = async (req, res) => {
  try {
    const findPw = await db.user.findOne({
      where: {
        userId: req.body.userId,
        phoneNumber: req.body.phoneNumber,
      },
    });
    return res.send(findPw);
  } catch (error) {
    console.error(err);
    res.status(500).send("비밀번호 찾기 오류");
  }
};

// 비밀번호 재설정
exports.newPw = async (req, res) => {
  try {
    const newPw = await db.user.update({
      where: {
        password: req.body.password,
      },
    });
    return res.send(newPw);
  } catch (error) {
    console.error(err);
    res.status(500).send("비밀번호 재설정 오류");
  }
};

// 회원 마이페이지
exports.mypage = (req, res) => {
  render("mypage");
};

// 회원 정보 수정 페이지
exports.editInfo = (req, res) => {
  render("editInfo");
};

// 회원 정보 수정 페이지 > 비밀번호 인증
exports.editInfoPw = async (req, res) => {
  try {
    const checkPw = await db.user.findOne({
      where: {
        password: req.body.password,
      },
    });
    return res.render("mypage/info", checkPw);
  } catch (error) {
    console.error(err);
    res.status(500).send("비밀번호 인증 오류");
  }
};

// 회원 정보 수정
exports.editInfo = async (req, res) => {
  try {
    const editInfo = await db.user.update({
      where: {
        userName: req.body.userName,
        phoneNumber: req.body.phoneNumber,
        birthday: req.body.birthday,
      },
    });
    return res.send(editInfo);
  } catch (error) {
    console.error(err);
    res.status(500).send("회원 정보 수정 오류");
  }
};

// 회원 탈퇴
exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await db.user.destroy({
      where: {
        userNumber: req.session.userNumber,
      },
    });
    return res.send(deleteUser);
  } catch (error) {
    console.error(err);
    res.status(500).send("회원 탈퇴 오류");
  }
};
