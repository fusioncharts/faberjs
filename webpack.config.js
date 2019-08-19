const path = require('path');
const webpack = require('webpack');

let libraryName = 'faber',
	fileName = 'faber',
	mode = process.argv[2].slice(2);

if (mode === 'prod') {
	fileName += '.min.js';
	mode = 'production';
} else {
	fileName += '.js';
	mode = 'development';
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: fileName,
    path: path.resolve(__dirname, 'dist'),
    library: libraryName,
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
  },
  mode: mode
};