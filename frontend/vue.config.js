const path = require("path");

module.exports = {
  pages: {
    index: {
      entry: "src/index.js",

      template: "public/index.html",

      filename: "index.html"
    },
    admin: {
      entry: "src/admin.js",

      template: "public/index.html",

      filename: "admin.html"
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        app: path.resolve(__dirname, "../")
      }
    }
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      exclude: [/^.*admin.*$/]
    },
    iconPaths: {
      favicon32: 'pwa/logo?w=32',
      favicon16: 'pwa/logo?w=16',
      appleTouchIcon: 'pwa/logo?w=152',
      msTileImage: 'pwa/logo?w=144',
            maskIcon: 'storage/site/safari-pinned-tab.svg',
    },
    name: "renus",
    themeColor: "#fff",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black"
  },

  chainWebpack: config => {
    if (process.env.NODE_ENV !== "production") {
      config.module
        .rule("eslint")
        .use("eslint-loader")
        .options({
          fix: true
        });
    }
  },
  outputDir: process.env.NODE_ENV === "production" ? "../public" : "dist",
  publicPath: "/",

  productionSourceMap: true,
  devServer: {
    proxy: "http://127.0.0.1:4000",
    overlay: {
      warnings: true,
      errors: true
    }
  }
};
