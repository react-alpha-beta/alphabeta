import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src/index'
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
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.html$/,
        loaders: ['file?name=[name].[ext]'],
      },
    ],
  },
};
