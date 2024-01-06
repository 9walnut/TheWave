const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const crypto = require("crypto");

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
        console.log("google profile ", profile);
        console.log("구글 accessToken", accessToken);
        console.log("구글 refreshToken", refreshToken); // undefined
        try {
          const exUser = await db.users.findOne({
            // 이미 가입된 아이디인지 확인
            where: { userId: profile.id },
          });
          if (exUser) {
            done(null, exUser); // 로그인 인증 완료
          } else {
            const randomPassword = crypto.randomBytes(20).toString("hex");
            const passwordSalt = crypto.randomBytes(16).toString("hex");

            const user = await db.users.create({
              userId: profile.id,
              userName: profile.displayName,
              phoneNumber: "00000000000",
              birthday: "1999-01-01",
              gender: "A",
              password: randomPassword,
              passwordSalt: passwordSalt,
            });
            done(null, user); // 회원가입하고 로그인 인증 완료
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
