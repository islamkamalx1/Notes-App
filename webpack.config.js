const path = require("path");

module.exports = {
  entry: {
    index: ["babel-polyfill", "./src/index.js"],
    edit: ["babel-polyfill", "./src/edit.js"],
  },
  output: {
    path: path.resolve(__dirname, "./dist/scripts"),
    filename: "[name]-bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, "./dist"),
    port: 8000,
  },
  devtool: "source-map",
};
