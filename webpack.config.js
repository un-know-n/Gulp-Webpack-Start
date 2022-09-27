const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };
  if (isProd) {
    config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()];
  }
  return config;
};

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '/css/',
      },
    },
    'css-loader',
  ];
  if (extra) loaders.push(extra);
  return loaders;
};

module.exports = {
  //Default directory to work with
  context: path.resolve(__dirname, 'src'),
  //Build mode
  mode: 'development',
  //Entry point
  entry: {
    main: './js/index.js',
    analytics: './js/analytics.js',
  },
  //End directory to put into
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[name].[ext]',
  },
  resolve: {
    //File-endings that can be places when import
    extensions: ['.js', '.json', '.png', '.jpg', '.gif', '.svg', '.css'],
    //Aliases for file paths'
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  //To use a library in other file, instead of importing it to every single one
  optimization: optimization(),
  //Source-maps
  devtool: isDev ? 'source-map' : '',
  //Plugins for webpack
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/bright-sun.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new ESLintPlugin(),
  ],
  //Developer server in browser
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 9000,
    open: true,
    hot: isDev,
  },
  //Loaders to process different types of files
  module: {
    rules: [
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader'],
      // },
      {
        test: /\.(png|ico|gif|svg|jpg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      {
        test: /\.csv$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.(scss|sass)$/i,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(m?js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
