require("dotenv").config();
const secret = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
// const { promisify } = require("util");
const redisClient = require("../middleware/redis");

// 토큰 생성 함수(access, refresh 토큰 반환)
function generateAccessToken(loginUser) {
  try {
    const payload = {
      userId: loginUser.userId,
      userNumber: loginUser.userNumber,
    };
    console.log("payload", payload);

    const accessToken = jwt.sign(payload, secret, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, secret, {
      expiresIn: "14d",
    });
    return { accessToken: accessToken, refreshToken: refreshToken };
  } catch (error) {
    console.error(error);
  }
}

// 토큰 검증 및 디코딩
const verifyToken = async (accessToken) => {
  // 토큰이 없는 경우
  if (!accessToken) {
    return { result: "no token" };
  }

  const token = accessToken.split(" ")[1];

  try {
    jwt.verify(token, secret); // access 토큰 검증
    return { accessToken: token }; // access 토큰이 만료되지 않은 경우, 토큰 다시 반환
  } catch (error) {
    // access 토큰이 만료된 경우
    const decodedToken = jwt.decode(token);
    const refreshToken = await redisClient.get(decodedToken.userId);

    try {
      jwt.verify(refreshToken, secret); // refresh 토큰 검증

      const payload = {
        userId: decodedToken.userId,
        userNumber: decodedToken.userNumber,
      };
      const newAccessToken = jwt.sign(payload, secret, {
        expiresIn: "1h",
      });
      return { accessToken: newAccessToken }; // 새 access 토큰 반환
    } catch (error) {
      // refresh 토큰이 만료된 경우
      return { result: "signin again" };
    }
  }
};

// 로그아웃 시 refresh 토큰 삭제
const deleteToken = async (accessToken) => {
  const token = accessToken.split(" ")[1];
  console.log("token", token);
  const decodedeToken = jwt.verify(token, secret);
  console.log("decodedeToken", decodedeToken);

  try {
    const decodedeToken = jwt.verify(token, secret);
    // const refreshToken = await getAsync(decodedeToken.userId);
    const refreshToken = await redisClient.get(decodedeToken.userId);
    console.log("refreshToken", refreshToken);

    try {
      jwt.verify(refreshToken, secret);
      await redisClient.del(decodedeToken.userId); // access 토큰의 userId에 해당하는 refresh 토큰 삭제
      // await delAsync(decodedeToken.userId);
      return { result: "true" };
    } catch (error) {
      console.error(error);
      return { result: "refresh token 검증 오류" };
    }
  } catch (error) {
    console.error(error);
    return { result: "access token 검증 오류" };
  }
};

module.exports = { generateAccessToken, verifyToken, deleteToken };
