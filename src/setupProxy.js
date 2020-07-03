const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/grade", { target: "http://localhost:5000/" })
  );
};
