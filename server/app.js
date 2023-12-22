const http = require("http");
// const https = require("https");
const express = require("express");
const app = express();
const redis = require("redis");
const client = redis.createClient({
  host: process.env.REDIS_HOST, // 'redis-19442.c323.us-east-1-2.ec2.cloud.redislabs.com'
  port: process.env.REDIS_PORT, // '19442'
  // 필요하다면 사용자 이름과 비밀번호도 추가
});
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const PORT = 8000;
// const https_port = 8001;

// const options = {
//   key: fs.readFileSync("./rootca.key"),
//   cert: fs.readFileSync("./rootca.crt"),
// };
const server = http.createServer(app);
// const https_server = https.createServer(options, app);

const io = require("socket.io")(server);
// const io_https = require("socket.io")(https_server);

// 실시간 채팅 미들웨어
const { liveChat } = require("./middleware/liveChat");

liveChat(io);
// socketHandler(io_https);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 60 * 1000,
    },
  })
);

const authRouter = require("./routes/auth");
app.use("/", authRouter);

const mypageRouter = require("./routes/mypage");
app.use("/mypage", mypageRouter);

const categoryRouter = require("./routes/category");
app.use("/category", categoryRouter);

const productRouter = require("./routes/product");
app.use("/product", productRouter);

const paymentRouter = require("./routes/payment");
app.use("/payment", paymentRouter);

const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

const cartRouter = require("./routes/cart");
app.use("/cart", cartRouter);

io.on("connection", (socket) => {
  console.log("New connection via HTTP");
});

// io_https.on("connection", (socket) => {
//   console.log("New connection via HTTPS");
// });

server.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});

// https_server.listen(https_port, function () {
//   console.log(`HTTPS Server Open: ${https_port}`);
// });
