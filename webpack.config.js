const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const OfflinePlugin = require("offline-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: "development",
  entry: {
    index: path.join(__dirname, "src", "index.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      },
      {
        test: /\.(jpg|png|txt)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.(ttf)$/,
        use: ["url-loader?limit=100000"]
      },
      {
        test: /\.txt$/i,
        use: "raw-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    compress: true,
    host: "0.0.0.0",
    port: 3000
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new BundleAnalyzerPlugin(),
    new WebpackPwaManifest({
      name: `My PWA`,
      short_name: `My PWA`,
      description: `A PWA starter. Current Version: ${
        process.env.npm_package_version
      }`,
      background_color: "#ffffff",
      theme_color: "#ffffff",
      display: "standalone",
      orientation: "portrait",
      crossorigin: "anonymous", //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve("src/assets/saitama.png"),
          size: "1024x1024"
        }
      ]
    }),
    // it's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin({
      safeToUseOptionalCaches: true,
      responseStrategy: "cache-first",
      caches: "all",
      ServiceWorker: {
        events: true
      },
      AppCache: false
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 50000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
