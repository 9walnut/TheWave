const redis = require("redis");

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

redisClient.connect((err) => {
  if (err) console.error(err);
  else console.log("redis 연결 성공!");
});

module.exports = redisClient;
