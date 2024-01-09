const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const crypto = require("crypto");
const { generateAccessToken } = require("../middleware/jwt");
const {
  db,
  db: { Op },
} = require("../models/index");
const User = require("../models/users");

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID, // 구글 로그인에서 발급받은 REST API 키
        clientSecret: process.env.GOOGLE_SECRET_KEY,
        callbackURL: process.env.GOOGLE_CALLBACK, // 구글 로그인 Redirect URI 경로
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await db.users.findOne({
            // 이미 가입된 아이디인지 확인
            where: { userId: profile.id },
          });

          let firstLogin = false;
          if (!user) {
            const randomPassword = crypto.randomBytes(20).toString("hex");
            const passwordSalt = crypto.randomBytes(16).toString("hex");

            // 받아올 수 없는 부분은 임의 값 넣어 유저 데이터 저장
            const user = await db.users.create({
              userId: profile.id,
              userName: profile.displayName,
              phoneNumber: profile.phoneNumber || "00000000000",
              birthday: profile.birthday || "1999-01-01",
              gender: profile.gender || "A",
              password: randomPassword,
              passwordSalt: passwordSalt,
            });

            const address = await db.address.create({
              userNumber: user.userNumber,
              address: profile.address || "No address",
            });
            firstLogin = true;
          }

          const { accessToken } = await generateAccessToken(user);
          done(null, { user, accessToken });
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
