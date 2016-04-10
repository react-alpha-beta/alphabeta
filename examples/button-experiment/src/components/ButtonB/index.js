import React from 'react';

import './style.css';

class ButtonB extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
    successAction: React.PropTypes.func,
  };

  onClick() {
    console.log('Button Variant B clicked');
    this.props.successAction();
  }

  render() {
    return (
      <div className="button button-blue"
           onClick={this.onClick}>
        {this.props.text || 'Button Variant B'}
      </div>
    );
  }
}

export default ButtonB;
