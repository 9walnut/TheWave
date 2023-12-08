const crypto = require("crypto");
const { db } = require("../models/index");

const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString("base64"));
    });
  });
};

const hashedPwWithSalt = async (pw) => {
  try {
    const salt = await createSalt();

    return new Promise((resolve, reject) => {
      crypto.pbkdf2(pw, salt, 100, 64, "sha512", (err, key) => {
        if (err) reject(err);
        const userPw = key.toString("base64");
        resolve({ userPw, salt });
      });
    });
  } catch (err) {
    reject(err);
  }
};

const comparePw = (userId, pw) => {
  return new Promise(async (resolve, reject) => {
    try {
      const idCheck = await db.users.findOne({
        where: { userId: userId },
      });

      if (idCheck) {
        const dbSalt = idCheck.passwordSalt;
        const dbPw = idCheck.password;

        if (!dbSalt) {
          reject(new Error("비밀번호 찾기 오류: salt값이 존재하지 않음"));
          return;
        }

        crypto.pbkdf2(pw, dbSalt, 100, 64, "sha512", (err, key) => {
          if (err) {
            reject(err);
            return;
          }
          if (key.toString("base64") === dbPw) resolve(true);
          else resolve(false);
        });
      } else resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { hashedPwWithSalt, comparePw };
