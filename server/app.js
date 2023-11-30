const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const multer = require("multer");
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

app.use("/uploads", express.static(__dirname + "/uploads"));

const authRouter = require("./routes/auth");
app.use("/", authRouter);

const shopRouter = require("./routes/shop");
app.use("/", shopRouter);

const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

const cartRouter = require("./routes/cart");
app.use("/cart", cartRouter);

app.post(
  "/upload/fields",
  uploadDetail.fields([{ name: "userfile1" }, { name: "userfile2" }]),
  function (req, res) {
    console.log("file 여러개(ver2): ", req.files);
    console.log("req.body: ", req.body);
    res.send("여러개 업로드 성공(ver2)");
  }
);

app.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});
