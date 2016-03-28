import React from 'react';

import './style.css';

class ButtonA extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
    successAction: React.PropTypes.func,
  };

  render() {
    return (
      <div className="button button-border"
           onClick={this.props.successAction}>
        {this.props.text || 'Button Variant A'}
      </div>
    );
  }
}

export default ButtonA;
