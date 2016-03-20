import React from 'react';

import './style.css';

class ButtonA extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
  };

  render() {
    return (
      <div className="button button-border">
        {this.props.text || 'Button Variant A'}
      </div>
    );
  }
}

export default ButtonA;
