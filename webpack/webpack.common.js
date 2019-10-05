const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const rules = require("./webpack.rules");

module.exports = {
  entry: ["./src/game.ts"],
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: "src/**/*.png", to: "images", flatten: true },
      { from: "src/**/*.mp3", to: "audio", flatten: true }
    ])
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: ""
  },
  resolve: {
    extensions: [".js", ".css", ".ts"],
    alias: {
      prefabs: path.resolve(__dirname, "../src/prefabs"),
      engine: path.resolve(__dirname, "../src/engine"),
      components: path.resolve(__dirname, "../src/components"),
      utils: path.resolve(__dirname, "../src/utils")
    },
    plugins: [new DirectoryNamedWebpackPlugin()]
  },
  module: {
    rules: rules
  }
};
