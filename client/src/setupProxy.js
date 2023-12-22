const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/register", {
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );

  // app.use(
  //   createProxyMiddleware("/", {
  //     target: "http://localhost:8000",
  //     changeOrigin: true,
  //   })
  // );

  //-----------------admin-----------------
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
};
