const jwt = require("jsonwebtoken");

// 토큰 생성 함수(생성된 토큰 반환함)
function generateAccessToken(loginUser) {
  const payload = {
    userId: loginUser.userId,
    userNumber: loginUser.userNumber,
  };
  console.log("payload", payload);
  const accessToken = jwt.sign(payload, "HiThisisTheWaveSecretKey", {
    expiresIn: "1h",
  });
  return accessToken;
}

// 토큰 검증 함수(검증 결과 반환함)
function verifyToken(token) {
  let verified;
  try {
    verified = jwt.verify(token, "HiThisisTheWaveSecretKey");
  } catch (error) {
    console.error(error);
  }
  return verified;
}

function decodeToken(accessToken) {
  const tokenCut = accessToken.split(" ")[1];
  const verify = verifyToken(tokenCut);

  try {
    if (verify) {
      const decodedToken = jwt.decode(tokenCut);
      return decodedToken;
    } else return false;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { generateAccessToken, decodeToken };
