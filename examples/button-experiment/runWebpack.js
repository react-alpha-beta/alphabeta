/* eslint-disable no-console */

import webpack from 'webpack';

import webpackConfig from './webpack.config';

// returns a Compiler instance
webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stats);
});

/* eslint-enable no-console */
