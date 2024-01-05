const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
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
        try {
          const exUser = await db.users.findOne({
            // 이미 가입된 아이디인지 확인
            where: { userId: profile.id },
          });
          if (exUser) {
            done(null, exUser); // 로그인 인증 완료
          } else {
            const randomPassword = crypto.randomBytes(20).toString("hex");
            const newUser = await db.users.create({
              userId: profile.id,
              userName: profile.displayName,
              phoneNumber: "00000000000",
              birthday: "2024-00-00",
              gender: "A",
              password: randomPassword,
              passwordSalt: randomPassword,
            });
            done(null, newUser); // 회원가입하고 로그인 인증 완료
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
