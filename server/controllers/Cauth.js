const { createHash } = require("crypto");
const { db } = require("../models/index");
const { hashedPwWithSalt, comparePw } = require("../middleware/pw");
const {
  generateAccessToken,
  deleteToken,
  generateAccessTokenSNS,
} = require("../middleware/jwt");
const axios = require("axios");
const qs = require("qs");
const jwt = require("jsonwebtoken");

// 메인 페이지 렌더
exports.main = async (req, res) => {
  try {
    const productsInfo = await db.products.findAll({
      where: { isDeleted: false },
      attributes: [
        "productId",
        "categoryId",
        "productName",
        "productPrice",
        "productInfo",
        "productStatus",
        "thumbnailUrl",
      ],
    });
    // console.log(productsInfo);
    res.json(productsInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send("상품 정보 불러오기 오류");
  }
};

// 로그인 페이지 랜더
exports.loginPage = (req, res) => {
  // res.send({ result: true });
};

// '로그인' 버튼 클릭 시
exports.loginUser = async (req, res) => {
  try {
    const { userId, password, cart } = req.body;
    const userCheck = await comparePw(userId, password);

    if (userCheck) {
      const loginUser = await db.users.findOne({
        where: {
          userId: userId,
        },
      });
      const { accessToken } = await generateAccessToken(loginUser);

      // 비회원 장바구니 동기화
      if (cart && cart.length > 0) {
        for (const item of cart) {
          const { productId, cartQuantity } = item;
          await db.carts.create({
            userNumber: loginUser.userNumber,
            productId,
            cartQuantity,
            isChecked: 0,
          });
        }
      }

      // isAdmin 값에 따라 페이지 이동
      if (loginUser.isAdmin === "Y") {
        res.send({
          result: true,
          isAdmin: true,
          accessToken: accessToken,
        });
      } else {
        res.send({
          result: true,
          isAdmin: false,
          accessToken: accessToken,
        });
      }
    } else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("로그인 오류");
  }
};

// 간편 로그인
exports.loginSNS = async (req, res) => {
  try {
    const { idToken, data } = req.body;

    if (!idToken) {
      const { userPw, salt } = await hashedPwWithSalt("data.profile.id");
      const kakaoId = String(data.profile.id);

      const userInfo = await db.users.create({
        userId: kakaoId,
        password: userPw,
        passwordSalt: salt,
        userName: data.profile.displayName || "Unknown",
        phoneNumber: data.profile.phoneNumber || "01099999999",
        birthday: data.profile.birthday || "1900-01-01",
        gender: data.profile.gender || "M",
      });

      const userAddress = await db.address.create({
        userNumber: userInfo.userNumber,
        address: "전북 군산",
      });

      const { accessToken } = await generateAccessTokenSNS(userInfo);
      console.log("accessToken", accessToken);
      res.send({
        result: true,
        isAdmin: false,
        accessToken: accessToken,
      });
    } else {
      // 회원 정보 db 저장
      const decoding = jwt.decode(idToken);
      console.log("sns jwt 토큰 디코딩 결과", decoding);
      const { userPw, salt } = await hashedPwWithSalt(decoding.sub);

      const userInfo = await db.users.create({
        userId: decoding.sub,
        password: userPw,
        passwordSalt: salt,
        userName: decoding.name,
        phoneNumber: decoding.phoneNumber || "01012345678",
        birthday: decoding.birthday || "1999-01-01",
        isAdmin: "N",
        gender: decoding.gender || "M",
      });

      const userAddress = await db.address.create({
        userNumber: userInfo.userNumber,
        address: "전북 익산",
      });

      const { accessToken } = await generateAccessTokenSNS(userInfo);
      res.send({
        result: true,
        isAdmin: false,
        accessToken: accessToken,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("간편 로그인 오류");
  }
};

// 로그아웃(access 토큰 받아 해당 사용자의 refresh 토큰 삭제)
exports.logout = async (req, res) => {
  try {
    const accessToken = req.headers["authorization"];
    const logoutCheck = await deleteToken(accessToken);

    if (logoutCheck) {
      res.send({ result: true });
      console.log(logoutCheck.result);
    } else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("로그아웃 오류");
  }
};

// 회원가입 페이지 렌더
exports.registerPage = (req, res) => {
  res.send({ result: true });
};

// '아이디 중복 확인' 버튼 클릭 시
exports.idCheck = async (req, res) => {
  try {
    const checkInfo = await db.users.findOne({
      where: {
        userId: req.body.userId,
        // phoneNumber: req.body.phoneNumber,
      },
    });
    if (!checkInfo) res.send({ result: true });
    else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("아이디 중복 체크 오류");
  }
};

// '회원가입' 버튼 클릭 시
exports.register = async (req, res) => {
  try {
    const {
      userId,
      password,
      userName,
      phoneNumber,
      birthday,
      gender,
      isAdmin,
      address,
    } = req.body.data;

    console.log(req.body, "바디바디");
    console.log(req.body.data, "바디데이터");
    console.log("주소입니다 ! ", address);

    const { userPw, salt } = await hashedPwWithSalt(password); // 암호화
    console.log("userPw", salt);

    const userInfo = await db.users.create({
      userId: userId,
      password: userPw,
      passwordSalt: salt,
      userName: userName,
      phoneNumber: phoneNumber,
      birthday: birthday,
      isAdmin: isAdmin,
      gender: gender,
    });

    const userAddress = await db.address.create({
      userNumber: userInfo.userNumber,
      address: address,
    });

    res.send({ userInfo, userAddress, result: true, msg: "하이헬로우" });
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    res.status(500).send("비밀번호 찾기 오류");
  }
};

// 비밀번호 재설정
exports.newPw = async (req, res) => {
  try {
    const { password, userId } = req.body;

    const { userPw, salt } = await hashedPwWithSalt(password);
    const newPw = await db.users.update(
      {
        password: userPw,
        passwordSalt: salt,
      },
      { where: { userId: userId } } // 유저 아이디와 일치하는 컬럼에서 비번 업데이트
    );
    console.log("newPw", newPw);
    res.send({ result: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("비밀번호 재설정 오류");
  }
};
