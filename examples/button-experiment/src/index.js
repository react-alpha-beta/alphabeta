import React from 'react';
import ReactDOM from 'react-dom';

import './index.html';
import './main.css';

import { ABComponent, DevTools } from '../../../src/index';
import ButtonA from './components/ButtonA';
import ButtonB from './components/ButtonB';

class Page extends React.Component {

  render() {
    return (
      <div>
        <div>
          <ABComponent
              experimentParams={{
                id: '1',
                testCohortSize: 0.4,
              }}
              ComponentA={ButtonA}
              ComponentB={ButtonB}
          />
        </div>

        <div>
          <ABComponent
              experimentParams={{
                id: '2',
                testCohortSize: 0.4,
              }}
              ComponentA={<ButtonA text="Text Variant 1" />}
              ComponentB={<ButtonA text="Text Variant 2" />}
          />
        </div>

        <DevTools />
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('app')
);
