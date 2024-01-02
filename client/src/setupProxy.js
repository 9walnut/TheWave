const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const apiURL = process.env.REACT_APP_BACKEND_URL;

  app.use(
    createProxyMiddleware("/api", {
      target: apiURL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "", // URL ^/api -> 공백 변경
      // },
    })
  );

  app.use(
    createProxyMiddleware("/api/register", {
      target: apiURL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "", // URL ^/api -> 공백 변경
      // },
    })
  );

  app.use(
    createProxyMiddleware("/api/login", {
      target: apiURL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "", // URL ^/api -> 공백 변경
      // },
    })
  );

  app.use(
    createProxyMiddleware("/api/mypage", {
      target: apiURL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "", // URL ^/api -> 공백 변경
      // },
    })
  );

  app.use(
    createProxyMiddleware("/api/products", {
      target: apiURL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "", // URL ^/api -> 공백 변경
      // },
    })
  );

  app.use(
    createProxyMiddleware("/api/cart", {
      target: apiURL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "", // URL ^/api -> 공백 변경
      // },
    })
  );

  app.use(
    createProxyMiddleware("/api/payment/:productId", {
      target: apiURL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "", // URL ^/api -> 공백 변경
      // },
    })
  );

  // ------------------- admin ----------------------
  app.use(
    createProxyMiddleware("/api/admin", {
      target: apiURL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "", // URL ^/api -> 공백 변경
      // },
    })
  );
  app.use(
    createProxyMiddleware("/api/admin/products", {
      target: apiURL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "", // URL ^/api -> 공백 변경
      // },
    })
  );
  app.use(
    createProxyMiddleware("/api/admin/products/:productId/edit", {
      target: apiURL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "", // URL ^/api -> 공백 변경
      // },
    })
  );

  app.use(
    createProxyMiddleware("/api/admin/products/:productId", {
      target: apiURL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "", // URL ^/api -> 공백 변경
      // },
    })
  );

  app.use(
    createProxyMiddleware("/api/admin/products/thumbnail", {
      target: apiURL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "", // URL ^/api -> 공백 변경
      // },
    })
  );
  app.use(
    createProxyMiddleware("/api/admin/products/:productId/edit/thumbnail", {
      target: apiURL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "", // URL ^/api -> 공백 변경
      // },
    })
  );

  app.use(
    createProxyMiddleware("/api/admin/users", {
      target: apiURL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "", // URL ^/api -> 공백 변경
      // },
    })
  );
  app.use(
    createProxyMiddleware("/api/admin/orders", {
      target: apiURL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "", // URL ^/api -> 공백 변경
      // },
    })
  );
  app.use(
    createProxyMiddleware("/api/admin/orders/:orderId", {
      target: apiURL,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "", // URL ^/api -> 공백 변경
      // },
    })
  );
};
