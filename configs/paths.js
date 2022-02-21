const path = require('path')

module.exports = {
  // Main source files
  src: path.resolve(__dirname, '../src'),

  // Production build files
  build: path.resolve(__dirname, '../build'),

  // Static files
  public: path.resolve(__dirname, '../public'),
}
