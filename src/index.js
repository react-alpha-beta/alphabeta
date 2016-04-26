import React from 'react';

import ABComponent from './ABComponent';
import getExperimentData from './Experiment';

module.exports = {
  ABComponent: ABComponent,
  DevTools: (process.env.NODE_ENV === 'production')
      ? () => (<div></div>)
      : require('./DevTools').default,
  getExperimentData: getExperimentData,
};
