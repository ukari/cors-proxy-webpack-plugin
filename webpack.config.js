var nodeExternals = require('webpack-node-externals');
var TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    'main': './src/index.js',
    'cors-sw': './src/browser/service-worker.js',
    'runtime': './src/browser/register.js',
    'loader': './src/register-loader.js',
  },
  output: {
    libraryTarget: "umd",
    library: "cors-proxy-webpack-plugin"
  },
  module:{
    rules: [
      {test: /\.js$/, use: 'babel-loader', exclude: /(node_modules)/}
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache        : true,
        parallel     : true,
        terserOptions: {
          compress: true,
          ie8: true,
          keep_classnames: true
        },
        sourceMap    : true
      })
    ]
  },
  node: {
    __dirname: false
  },
  target: 'node',
  externals: [nodeExternals()],
}
