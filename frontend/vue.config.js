const path = require("path");

module.exports = {
  pages: {
    index: {
      entry: "src/Index.js",

      template: "public/index.html",

      filename: "index.html",
    },
    admin: {
      entry: "src/Admin.js",

      template: "public/index.html",

      filename: "admin.html",
    },
  },
  configureWebpack: {
    module: {
      noParse: (content) => {
        return !/\.js|\.vue|\.mjs|\.json/.test(content)
      }
    },
    resolve: {
      alias: {
        app: path.resolve(__dirname, "../"),
      },
    },
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      exclude: [/^.*admin.*$/, "index.html"],
    },
    iconPaths: {
      favicon32: "pwa/logo?w=32",
      favicon16: "pwa/logo?w=16",
      appleTouchIcon: "pwa/logo?w=152",
      msTileImage: "pwa/logo?w=144",
      maskIcon: "storage/site/safari-pinned-tab.svg",
    },
    name: "rekar",
    themeColor: "#fff",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
  },

  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== "production") {
      config.module.rule("eslint").use("eslint-loader").options({
        fix: true,
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
      errors: true,
    },
  },
};
