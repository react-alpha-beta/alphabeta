/* eslint-disable no-console */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack.config';

const port = 3000;

new WebpackDevServer(webpack(webpackConfig), {
  contentBase: './dist',
}).listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening on port ${port}`);
});

/* eslint-enable no-console */
