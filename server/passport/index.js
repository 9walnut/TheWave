const passport = require("passport");
// const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const naver = require("./naverStrategy");
const { db } = require("../models/index");

module.exports = () => {
  passport.serializeUser((db, done) => {
    done(null, db.users.userid);
  });

  passport.deserializeUser((userid, done) => {
    db.users
      .findOne({ where: { userid } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  // local();
  kakao();
  naver();
};
