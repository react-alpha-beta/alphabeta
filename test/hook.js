require('babel-register')();

const noop = () => {};
require.extensions['.css'] = noop;
