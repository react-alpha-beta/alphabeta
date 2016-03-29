import React from 'react';

import ABComponent from './ABComponent';

module.exports = {
  ABComponent: ABComponent,
  DevTools: (process.env.NODE_ENV === 'production')
      ? () => (<div></div>)
      : require('./DevTools').default,
};
