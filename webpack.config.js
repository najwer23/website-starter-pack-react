const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

var entryCustom = [
  "index"
].reduce((o, key) => ({ ...o, [key]: path.resolve(__dirname, "./src/" + key + ".js") }), {})
  
module.exports = {
  entry: entryCustom,
  output: {
    filename: "[name].[fullhash].bunde.js",
    path: path.resolve(__dirname, "./build"),
    publicPath: "/",
  },
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      favicon: "./src/media/f.png",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
      inject: "body",
      // scriptLoading: "defer"
    }),
    new MiniCssExtractPlugin({
      linkType: "text/css",
      filename: "[name].[fullhash].css",
      chunkFilename: "[id].css",
    }),
    new CleanWebpackPlugin(),
  ],
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    ie: "11",
                  },
                },
              ],
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: "asset/resource",
      },
    ],
  },
};
