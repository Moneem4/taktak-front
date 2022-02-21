const path = require('path')
const paths = require('./paths')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Customize the webpack build process
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: paths.build,
          globOptions: {
            ignore: ['index.html'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(paths.public, 'index.html'), // Input file
      filename: 'index.html', // Output file
    }),
  ],

  // Customize the processing of imports
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2|png|jpe?g|gif|ico)$/,
        use: ['file-loader?name=[name].[ext]'],
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 8192,
        //       name: '[name].[ext]',
        //       publicPath: '/',
        //     },
        //   },
        // ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
}
