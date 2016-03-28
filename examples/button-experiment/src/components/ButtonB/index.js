import React from 'react';

import './style.css';

class ButtonB extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
    successAction: React.PropTypes.func,
  };

  render() {
    return (
      <div className="button button-blue"
           onClick={this.props.successAction}>
        {this.props.text || 'Button Variant B'}
      </div>
    );
  }
}

export default ButtonB;
