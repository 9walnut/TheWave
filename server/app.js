const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const PORT = 8000;

const io = require("socket.io")(server);

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

io.on("connection", (socket) => {});

server.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});
