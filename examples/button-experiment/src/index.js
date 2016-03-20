import React from 'react';
import ReactDOM from 'react-dom';

import './index.html';
import './main.css';

import { ABComponent } from '../../../src/index';
import ButtonA from './components/ButtonA';
import ButtonB from './components/ButtonB';

class Page extends React.Component {
  render() {
    return (
      <div>
        <ABComponent
            experimentId="button-experiment"
            variants={[
              { component: ButtonA, occurrence: 0.8 },
              { component: ButtonB, occurrence: 0.2 },
            ]} />
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('app')
);
