module.exports = {
  development: {
    host: "localhost",
    database: "thewave",
    username: "admin",
    password: "1q2w3e4r",
    dialect: "mysql",
  },
  production: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: "mysql",
  },
  test: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: "mysql",
  },
};
