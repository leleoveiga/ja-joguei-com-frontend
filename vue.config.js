const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../ja-joguei-com-backend/public"),
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000"
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: path.resolve("./src/components"),
        views: path.resolve("./src/views"),
        src: path.resolve("./src")
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
