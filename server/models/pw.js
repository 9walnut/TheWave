const crypto = require("crypto");
const { db } = require("../models/index");

const createSalt = () => {
  new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString("base64"));
    });
  });
};

const hashedPwWithSalt = (pw) => {
  new Promise(async (resolve, reject) => {
    const salt = await createSalt();
    crypto.pbkdf2(pw, salt, 100, 64, "sha512", (err, key) => {
      if (err) reject(err);
      resolve({ password: key.toString("base64"), salt });
    });
  });
};

const comparePw = (userId, pw) => {
  new Promise(async (resolve, reject) => {
    try {
      const dbSalt = await db.users.findOne({
        attributes: ["passwordSalt"],
        where: { userId },
      });

      const salt = dbSalt ? dbSalt.passwordSalt : null; // dbSalt가 true면 db에 저장된 salt값 반환

      if (!salt) {
        reject(new Error("비밀번호 찾기 오류"));
        return;
      }

      crypto.pbkdf2(pw, salt, 100, 64, "sha512", (err, key) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(key.toString("base64"));
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { hashedPwWithSalt, comparePw };
