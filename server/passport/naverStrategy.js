const passport = require("passport");
const NaverStrategy = require("passport-naver").Strategy;
const { db } = require("../models/index");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // 추가

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
          const exUser = await db.users.findOne({
            where: {
              userid: profile.id,
              // provider: "naver"
            },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await db.users.create({
              userId: profile.id,
              userName: profile.displayName,
              phoneNumber: profile.phone_number,
              birthday: profile.birthday,
              gender: profile.gender,
              password: randomPassword, // 임의의 비밀번호를 저장
              // provider: "naver",
            });
            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
