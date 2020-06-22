const proxy = require("http-proxy-middleware");
require("../public/config");

module.exports = function (app) {
  app.use(
    proxy("/api/**", {
      target: API_DOMAIN,
      changeOrigin: true,
    })
  );
};
