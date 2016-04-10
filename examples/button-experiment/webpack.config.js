import path from 'path';
import webpack from 'webpack';

export default {
  // See https://github.com/webpack/webpack/pull/2207
  devtool: 'cheap-source-map',
  entry: [
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /^((?!\.module).)*\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.module\.css$/,
        loaders: ['style', 'css?modules&sourceMap'],
      },
      {
        test: /\.html$/,
        loaders: ['file?name=[name].[ext]'],
      },
    ],
  },
};
