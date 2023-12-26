const redis = require("redis");

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  // legacyMode: true, // v3 버전에서만 필요함
});

redisClient.connect((err) => {
  if (err) console.error(err, "redis 연결 실패ㅠㅠ");
  else {
    console.log("redis 연결 성공!");

    // 연결 성공 후 테스트 키-값 설정
    redisClient.set("testKey", "testValue", redis.print);
  }
});

// 설정한 키의 값을 가져와서 출력
redisClient.get("testKey", (err, reply) => {
  if (err) {
    console.error(err);
  } else {
    console.log("testKey의 값:", reply);
  }
});

module.exports = redisClient;
