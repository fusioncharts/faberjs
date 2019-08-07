const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'faber',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, ''),
    compress: true,
    open: true,
    hot: true,
    port: 9000
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['@babel/preset-env']
      }
    }]
  }
};