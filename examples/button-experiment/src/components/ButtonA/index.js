import React from 'react';

import './style.css';

class ButtonA extends React.Component {
  static propTypes = {
    successAction: React.PropTypes.func,
  }

  render() {
    return (
      <div className="button button-border"
           onClick={this.props.successAction}>Button Variant A</div>
    );
  }
}

export default ButtonA;
