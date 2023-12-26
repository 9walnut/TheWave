const env = process.env.NODE_ENV || "development";
const Sequelize = require("sequelize");
const initModels = require("./init-models");
const config = require("../config/config")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const db = initModels(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op; // Op 추가

module.exports = { db, sequelize };
