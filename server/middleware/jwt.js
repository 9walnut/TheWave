require("dotenv").config();
const secret = process.env.SECRET_KEY;
const redis = require("redis");
const redisClient = redis.createClient(process.env.REDIS_PORT);
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

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

// refresh 토큰 검증
const refreshVerify = async (token, userId) => {
  const getAsync = promisify(redisClient.get).bind(redisClient); //redis 모듈에게서 promise 반환받기

  try {
    const data = await getAsync(userId); //userId로 refresh 토큰 가져오기
    try {
      if (token == data) {
        jwt.verify(token, secret);
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

// 토큰 검증 및 디코딩
async function verifyToken(accessToken, refreshToken) {
  if (accessToken && refreshToken) {
    const token = accessToken.split(" ")[1];

    let verified;
    try {
      verified = jwt.verify(token, secret);

      const decodedToken = jwt.decode(token);
      const refreshResult = await refreshVerify(
        refreshToken,
        decodedToken.userId
      );

      // access 토큰이 만료된 상태일 때
      if (!verified) {
        // refresh 토큰도 만료된 경우
        if (!refreshResult) {
          return { result: "재로그인하세요." };
        } else {
          // refresh 토큰은 만료되지 않은 경우(새 access 토큰 발급)
          const payload = {
            userId: decodedToken.userId,
            userNumber: decodedToken.userNumber,
          };
          const newAccessToken = jwt.sign(payload, secret, {
            expiresIn: "1h",
          });
          return { accessToken: newAccessToken, refreshToken: refreshToken };
        }
      } else return { result: "access 토큰 유효함", userInfo: decodedToken };
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = { generateAccessToken, verifyToken };
