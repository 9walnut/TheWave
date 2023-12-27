const env = process.env.NODE_ENV || "development";
const Sequelize = require("sequelize");
const initModels = require("./init-models");
const config = require("../config/config.js")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const db = initModels(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

const connectWithRetry = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    console.log("Retrying in 5 seconds...");
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

module.exports = { db, sequelize };
