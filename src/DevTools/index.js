import React from 'react';

import { localStorageKey } from '../constants';

class DevTools extends React.Component {
  static displayName = 'DevTools';

  static propTypes = {
  };

  constructor(props) {
    super(props);

    try {
      const jsonStr = global.localStorage.getItem(localStorageKey);
      this.state = {
        alphaBetaMap: jsonStr && JSON.parse(jsonStr) || {},
      };
    } catch (err) {
      this.state = {
        alphaBetaMap: {},
      };
    }
  }

  onChange = (event) => {
    const newAlphaBetaMap = {
      ...this.state.alphaBetaMap,
      [event.target.name]: event.target.value,
    };
    this.setState({
      alphaBetaMap: newAlphaBetaMap,
    });
    const jsonStr = JSON.stringify(newAlphaBetaMap);
    global.localStorage.setItem(localStorageKey, jsonStr);
  };

  renderExperiment(id, value) {
    return (
        <div key={id} style={{display: 'flex'}}>
          <label>'Experiment: {id}' 0:</label>
          <input type="range" min="0" max="1" step="0.01" name={id} value={value} onChange={this.onChange} />
          :1
        </div>
    );
  }

  render() {
    const { alphaBetaMap } = this.state;
    return (
      <div style={{position: 'fixed',
                   bottom: 0,
                   right: 0,
                   margin: '1em',
                   padding: '1em',
                   background: '#eee',
                   border: '2px solid #777'}}>
        <span style={{'textDecoration': 'underline'}}>'Dev Tools:'</span>

        {Object.keys(alphaBetaMap).map(id => this.renderExperiment(id, alphaBetaMap[id]))}
        <div>
          {JSON.stringify(this.alphaBetaMap, null, 2)}
        </div>
      </div>
    );
  }
}

export default DevTools;
