const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const { db } = require("../models/index");
// const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: process.env.KAKAO_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
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
              userName: profile.displayName || "Unknown",
              phoneNumber: phoneNumber,
              birthday: profile._json.kakao_account.birthday || "1900-01-01",
              gender: profile._json.kakao_account.gender || "M",
            });

            address = await db.address.create({
              userNumber: user.userNumber,
              address: profile._json.kakao_account.address || "전북 익산!",
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
