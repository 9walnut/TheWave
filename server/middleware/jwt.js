require("dotenv").config();
const secret = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
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
  const getAsync = promisify(redisClient.get).bind(redisClient); //redis 모듈에게서 promise 반환받기

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
    const refreshToken = await getAsync(decodedToken.userId);

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

module.exports = { generateAccessToken, verifyToken };
