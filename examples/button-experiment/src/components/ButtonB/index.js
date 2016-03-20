import React from 'react';

import './style.css';

class ButtonB extends React.Component {
  static propTypes = {
    successAction: React.PropTypes.func,
  }

  render() {
    return (
      <div className="button button-blue"
           onClick={this.props.successAction}>Button Variant B</div>
    );
  }
}

export default ButtonB;
