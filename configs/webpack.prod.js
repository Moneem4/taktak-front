const path = require('path')
const paths = require('./paths')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const babelpoly = require('babel-polyfill')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  entry: ['babel-polyfill', path.resolve(paths.src, 'index.js')],
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        cache: true,
        parallel: true,
      }),
    ],
    runtimeChunk: {
      name: 'runtime',
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
})
