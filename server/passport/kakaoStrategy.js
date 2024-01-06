const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const { db } = require("../models/index");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // 추가

const secret = process.env.SECRET_KEY; // 암호화에 사용할 키

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "http://localhost:8001/api/login/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try {
          let user = await db.users.findOne({
            where: {
              userId: profile.id,
            },
          });

          let firstLogin = false;
          if (!user) {
            const randomPassword = crypto.randomBytes(20).toString("hex"); // 임의의 비밀번호 생성
            const passwordSalt = crypto.randomBytes(16).toString("hex"); // 임의의 솔트 생성
            const phoneNumber =
              profile._json.kakao_account.phone_number?.replace(/-/g, "") ||
              "01000000000"; // '-' 제거

            user = await db.users.create({
              userId: profile.id,
              password: randomPassword,
              passwordSalt: passwordSalt,
              // providerType: "kakao",
              userName: profile.displayName || "Unknown", // 카카오 프로필에서 제공하지 않을 경우 기본값
              phoneNumber: phoneNumber,
              birthday: profile._json.kakao_account.birthday || "1900-01-01",
              gender: profile._json.kakao_account.gender || "M",
            });
            firstLogin = true;
          }

          // // JWT 토큰 생성
          // const payload = {
          //   userId: user.userId,
          //   userNumber: user.userNumber,
          // };

          // const jwtAccessToken = jwt.sign(payload, secret, {
          //   expiresIn: "30s", // 유효 기간
          // });

          // const jwtRefreshToken = jwt.sign(payload, secret, {
          //   expiresIn: "14d", // 유효 기간
          // });

          // JWT 토큰과 사용자 정보를 함께 반환
          done(null, user);
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
