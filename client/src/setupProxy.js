const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const apiURL = process.env.REACT_APP_BACKEND_URL;
  app.use(
    createProxyMiddleware("/register", {
      target: apiURL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/login", {
      target: apiURL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/mypage", {
      target: apiURL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/admin/products", {
      target: apiURL,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/admin/users", {
      target: apiURL,
      changeOrigin: true,
    })
  );
};
