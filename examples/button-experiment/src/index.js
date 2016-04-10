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
          <div style={{'width': '50%',
                       'margin': 'auto',
                       'lineHeight': '26px',
                       'fontSize': '20px'}}>
            <p>Here are two experiments, each showing two different independent experiments.
            </p>
            <p>By modifying the values of sliders in the bottom righthand corner you can alter the chance
            you (as the current user) have of seeing each button experiment.
            </p>
            <p>Try it and see:</p>
          </div>

          <div style={{'width': '30%',
                       'margin': 'auto',
                       'paddingTop': '20px'}}>
             Experiment 1:
             <ABComponent
                experimentParams={{
                  id: '1',
                  testCohortSize: 0.4,
                }}
                ComponentA={ButtonA}
                ComponentB={ButtonB}
            />
          </div>
        </div>
        <div>
          <div style={{'width': '30%',
                       'margin': 'auto',
                       'paddingTop': '20px'}}>
            Experiment 2:
            <ABComponent
                experimentParams={{
                  id: '2',
                  testCohortSize: 0.4,
                }}
                ComponentA={<ButtonA text="Alternate Text A" />}
                ComponentB={<ButtonB text="Alternate Text B" />}
            />
          </div>
        </div>
        <DevTools/>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('app')
);
