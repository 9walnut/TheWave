const passport = require("passport");
// const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const google = require("./googleStrategy");
const naver = require("./naverStrategy");
const { db } = require("../models/index");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.userId);
  });

  passport.deserializeUser((userId, done) => {
    db.users
      .findOne({ where: { userId } })
      .then((user) => {
        done(null, user); // 사용자 객체로 역직렬화
      })
      .catch((err) => done(err));
  });

  // local();
  kakao();
  naver();
  google();
};
