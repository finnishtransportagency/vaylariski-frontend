const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/" + process.env.REACT_APP_BASE_REST_URL,
    createProxyMiddleware({
      target: process.env.PROXY_URL || "http://127.0.0.1:8000",
      changeOrigin: true,
    })
  );
};
