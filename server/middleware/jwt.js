require("dotenv").config();
const secret = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const redisClient = require("../middleware/redis");

// 토큰 생성 함수(access, refresh 토큰 반환)
async function generateAccessToken(loginUser) {
  try {
    const payload = {
      userId: loginUser.userId,
      userNumber: loginUser.userNumber,
    };

    const accessToken = jwt.sign(payload, secret, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(payload, secret, {
      expiresIn: "14d",
    });

    await redisClient.set(loginUser.userId, refreshToken); //userId를 키로 refresh 토큰 저장
    await redisClient.expire(loginUser.userId, 1209600); // 14일 후 데이터 삭제

    return { accessToken: accessToken };
  } catch (error) {
    console.error(error);
  }
}

// 간편 로그인 토큰 생성 함수
async function generateAccessTokenSNS(loginUser) {
  try {
    const payload = {
      userId: loginUser.userId,
      userNumber: loginUser.userNumber,
    };

    const accessToken = jwt.sign(payload, secret, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(payload, secret, {
      expiresIn: "14d",
    });

    await redisClient.set(loginUser.userId, refreshToken);
    await redisClient.expire(loginUser.userId, 1209600);

    return { accessToken: accessToken };
  } catch (error) {
    console.error(error);
    return { error: "accessToken 생성 중 오류 발생함" };
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
    const decodeAccessToken = jwt.decode(token);
    return { accessToken: token, userData: decodeAccessToken }; // access 토큰이 만료되지 않은 경우, 토큰과 payload 값 반환
  } catch (error) {
    // access 토큰이 만료된 경우
    const decodedToken = jwt.decode(token);
    try {
      const refreshToken = await redisClient.get(decodedToken.userId);
      const checkBlackList = await redisClient.get(refreshToken);

      if (checkBlackList !== "logoutToken") {
        jwt.verify(refreshToken, secret); // refresh 토큰 검증

        const payload = {
          userId: decodedToken.userId,
          userNumber: decodedToken.userNumber,
        };
        const newAccessToken = jwt.sign(payload, secret, {
          expiresIn: "1h",
        });
        const decodeNewAccessToken = jwt.decode(newAccessToken);
        return { accessToken: newAccessToken, userData: decodeNewAccessToken }; // 새 access 토큰 반환
      } else {
        return { result: "logoutToken" }; // 이미 로그아웃한 토큰
      }
    } catch (error) {
      // refresh 토큰이 만료된 경우
      return { result: "signin again" };
    }
  }
};

// 로그아웃 시 refresh 토큰 삭제
const deleteToken = async (accessToken) => {
  const token = accessToken.split(" ")[1];
  const decodedToken = jwt.decode(token);

  try {
    const refreshToken = await redisClient.get(decodedToken.userId);
    const verifyRefreshToken = jwt.verify(refreshToken, secret);

    const expireTime = (
      verifyRefreshToken.exp -
      new Date().getTime() / 1000
    ).toFixed();

    try {
      await redisClient.set(refreshToken, "logoutToken"); // 로그아웃한 사용자의 refresh 토큰을 logoutToken 값을 넣어 저장
      await redisClient.expire(refreshToken, expireTime); // 발급되었던 시점으로부터 14일 뒤엔 삭제됨

      await redisClient.del(decodedToken.userId);

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

module.exports = {
  generateAccessToken,
  verifyToken,
  deleteToken,
  generateAccessTokenSNS,
};
