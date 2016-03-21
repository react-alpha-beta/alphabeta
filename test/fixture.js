import React from 'react';
import { jsdom } from 'jsdom';

global.document = jsdom('');
global.window = document.defaultView;
global.navigator = {
  userAgent: 'node.js',
};
const exposedProperties = ['window', 'navigator', 'document'];
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.localStorage = {
  data: {},

  getItem(key) {
    if (typeof this.data[key] === 'undefined') {
      return null;
    }
    return this.data[key];
  },

  setItem(key, value) {
    this.data[key] = value;
  },

  clear() {
    this.data = {};
  },
};

export class ButtonA extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
  };

  render() {
    return (
      <div>{this.props.text || 'ButtonA'}</div>
    );
  }
}

export class ButtonB extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
  };

  render() {
    return (
      <div>{this.props.text || 'ButtonB'}</div>
    );
  }
}
