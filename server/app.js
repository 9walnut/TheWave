const express = require("express");
const app = express();

// https 모듈 가져오기
const https = require("https");
const fs = require("fs");

// certificate & private key 가져오기
// 인증서 위치 config내 보관 예정
const sslOptions = {
  // ca: fs.readFileSync("./config/ca.crt"),
  key: fs.readFileSync("./config/cert.key"),
  cert: fs.readFileSync("./config/cert.crt"),
};

const path = require("path");
const session = require("express-session");
const PORT = 8000;

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

app.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});

https.createServer(sslOptions, app).listen(443, () => {
  console.log(`Https Sever Open on port 443`);
});
