/**
 * @overview Anything that is configurable should be in config.js.
 */

export default {
  endPoint: process.env.ALPHA_BETA_ENDPOINT
      || 'http://127.0.0.1:8000/api/alphabeta',
};
