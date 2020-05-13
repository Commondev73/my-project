const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    proxy({
      target: "https://dkns1337.site",
      changeOrigin: true
    })
  );
};