const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // const apiURL = process.env.REACT_APP_BACKEND_URL;

  // app.use(
  //   createProxyMiddleware("/", {
  //     target: "http://localhost:8000",
  //     changeOrigin: true,
  //   })
  // );

  app.use(
    createProxyMiddleware("/register", {
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/login", {
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/mypage", {
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/admin/products", {
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/admin/users", {
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/admin/products/thumbnail", {
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );
};
