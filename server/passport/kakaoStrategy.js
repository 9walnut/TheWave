const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const { db } = require("../models/index");
// const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { generateAccessToken } = require("../middleware/jwt");

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
              address: profile.address || "No address",
            });
            firstLogin = true;
          }

          const { accessToken, refreshToken } = await generateAccessToken(user);
          done(null, { user, accessToken, refreshToken });
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
