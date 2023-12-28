const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const apiURL = process.env.REACT_APP_API_URL;

  // app.use(
  //   createProxyMiddleware("/", {
  //     target: apiURL,
  //     changeOrigin: true,
  //   })
  // );

  // app.use(
  //   createProxyMiddleware("/register", {
  //     target: apiURL,
  //     changeOrigin: true,
  //   })
  // );

  // app.use(
  //   createProxyMiddleware("/login", {
  //     target: apiURL,
  //     changeOrigin: true,
  //   })
  // );

  // app.use(
  //   createProxyMiddleware("/mypage", {
  //     target: apiURL,
  //     changeOrigin: true,
  //   })
  // );

  // app.use(
  //   createProxyMiddleware("/products", {
  //     target: "http://localhost:8000",
  //     changeOrigin: true,
  //   })
  // );

  // ------------------- admin ----------------------
  app.use(
    createProxyMiddleware("/admin/products", {
      target: apiURL,
      changeOrigin: true,
    })
  );
  // app.use(
  //   createProxyMiddleware("/admin/products/:productId", {
  //     target: "http://localhost:8000",
  //     changeOrigin: true,
  //   })
  // );

  app.use(
    createProxyMiddleware("/admin/users", {
      target: apiURL,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/admin/products/thumbnail", {
      target: apiURL,
      changeOrigin: true,
    })
  );
};
