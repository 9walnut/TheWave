module.exports = {
  development: {
    host: "localhost",
    database: "thewave",
    username: "admin",
    password: "1q2w3e4r",
    dialect: "mysql",
  },
  production: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    dialect: "mysql",
  },
};
