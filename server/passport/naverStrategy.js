const passport = require("passport");
const NaverStrategy = require("passport-naver").Strategy;
const { db } = require("../models/index");
// const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_ID,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: "http://localhost:8001/api/login/naver/callbackk",
      },
      async (accessToken, refreshToekn, profile, done) => {
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

            user = await db.users.create({
              userId: profile.id,
              password: randomPassword,
              passwordSalt: passwordSalt,
              userName: profile.displayName || "Unknown",
              phoneNumber: profile._json.phoneNumber || "0100000000",
              birthday: profile._json.birthday || "1900-01-01",
              gender: profile._json.gender || "M",
              // providerType: "kakao",
            });
            firstLogin = true;
          }

          done(null, user);
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
