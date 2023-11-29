const express = require("express");
const app = express();
const session = require("express-session");
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const shopRouter = require("./routes");
app.use("/", shopRouter);

const adminRouter = require("./routes");
app.use("/admin", adminRouter);

app.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});
