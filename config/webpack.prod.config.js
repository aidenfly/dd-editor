/*
 * @Author: Aiden
 * @Date: 2020-09-01 16:37:29
 * @LastEditTime: 2021-04-14 19:16:09
 * @LastEditors: Aiden
 * @Description:
 */
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.jsx",
  devtool: "nosources-source-map",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "../dist"),
    libraryTarget: "commonjs2",
  },
  optimization: {
    minimize: true
  },
  performance: {
    hints: false,
    maxEntrypointSize: 5120000,
    maxAssetSize: 5120000,
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "react",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "reactDOM",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: [path.resolve(__dirname, "../node_modules")],
      },
      {
        test: /\.mdx$/,
        use: ['babel-loader', '@mdx-js/loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: [path.resolve(__dirname, "../node_modules")],
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: {
                path: "postcss.config.js",
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: [path.resolve(__dirname, "../node_modules")],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|gif|jpg|eot|svg|ttf|woff|woff2)$/,
        exclude: [path.resolve(__dirname, "../node_modules")],
        use: [
          {
            loader: "url-loader",
            options: {
            //   // 做一个限制，当我们图标小于多少时用base64来转化，否则用file-loader产生真实的图片。
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"], // 表示这几个文件的后缀名都可以省略不写，按照顺序依次查找。
    alias: {
      "@": path.join(__dirname, "../src"),
    },
  },
};
