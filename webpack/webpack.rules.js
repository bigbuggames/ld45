const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
  {
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-typescript"],
          plugins: [
            "@babel/plugin-transform-computed-properties",
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-proposal-class-properties"
          ]
        }
      },
      {
        loader: "linaria/loader",
        options: {
          sourceMap: process.env.NODE_ENV !== "production"
        }
      }
    ]
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: process.env.NODE_ENV !== "production"
        }
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: process.env.NODE_ENV !== "production"
        }
      }
    ]
  },
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: ["file-loader"]
  },
  {
    test: /\.(webm|mp3|wav)$/,
    use: ["file-loader"]
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: ["file-loader"]
  }
];
