import React from 'react';

import './style.css';

class ButtonA extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
    successAction: React.PropTypes.func,
  };

  onClick = () => {
    console.log('Button Variant A clicked');
    this.props.successAction();
  };

  render() {
    return (
      <div className="button button-border"
           onClick={this.onClick}>
        {this.props.text || 'Button Variant A'}
      </div>
    );
  }
}

export default ButtonA;
