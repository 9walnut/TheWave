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
              userid: profile.id,
            },
          });

          let firstLogin = false;
          if (!user) {
            const randomPassword = crypto.randomBytes(20).toString("hex"); // 임의의 비밀번호 생성
            user = await db.users.create({
              userId: profile.id,
              userName: profile.displayName,
              phoneNumber: profile.phone_number,
              birthday: profile.birthday,
              gender: profile.gender,
              password: randomPassword, // 임의의 비밀번호를 저장
              providerType: "kakao",
            });
            firstLogin = true; // 첫 로그인이라는 플래그 설정
          }

          // JWT 토큰 생성
          const payload = {
            userId: user.userId,
            userNumber: user.userNumber,
          };

          const jwtAccessToken = jwt.sign(payload, secret, {
            expiresIn: "30s", // 유효 기간
          });

          const jwtRefreshToken = jwt.sign(payload, secret, {
            expiresIn: "14d", // 유효 기간
          });

          // JWT 토큰과 사용자 정보를 함께 반환
          done(null, {
            user,
            accessToken: jwtAccessToken,
            refreshToken: jwtRefreshToken,
            firstLogin,
          });
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
