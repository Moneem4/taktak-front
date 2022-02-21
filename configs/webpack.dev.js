const path = require('path')
const paths = require('./paths')

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  entry: path.resolve(paths.src, 'index.js'),

  devtool: 'inline-source-map',

  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 1337,
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
})
