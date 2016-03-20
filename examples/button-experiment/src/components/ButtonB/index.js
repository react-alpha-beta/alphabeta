import React from 'react';

import './style.css';

class ButtonB extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
  };

  render() {
    return (
      <div className="button button-blue">
        {this.props.text || 'Button Variant A'}
      </div>
    );
  }
}

export default ButtonB;
