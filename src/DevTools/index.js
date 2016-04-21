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
        hasChanged: false,
      };
    } catch (err) {
      this.state = {
        alphaBetaMap: {},
        hasChanged: false,
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
      hasChanged: true,
    });
    const jsonStr = JSON.stringify(newAlphaBetaMap);
    global.localStorage.setItem(localStorageKey, jsonStr);
  };

  renderExperiment(id, value) {
    return (
      <div key={id} style={{fontSize: 'small'}}>
        <div style={{display: 'inline-block', width: '30%'}}>{id}</div>
        <div style={{display: 'inline-block', width: '20%'}}>{value}</div>
        <div style={{display: 'inline-block', width: '40%'}}>
          <input type="range"
                 min="0"
                 max="1"
                 step="0.01"
                 name={id}
                 value={value}
                 onChange={this.onChange} />
        </div>
      </div>
    );
  }

  render() {
    const { alphaBetaMap } = this.state;

    let refreshMessage;
    if (this.state.hasChanged === true) {
      refreshMessage = (
        <div style={{
          fontSize: 'small',
          color: 'red',
        }}>
          (Refresh this page for your changes to take effect)
        </div>
      );
    }

    return (
      <div style={{position: 'fixed',
                   bottom: 0,
                   right: 0,
                   margin: '1em',
                   minWidth: '25%',
                   padding: '1em',
                   background: '#eee',
                   border: '2px solid #777'}}>
        <div style={{
          'display': 'block',
          'textAlign': 'center',
          'textDecoration': 'underline',
        }}>'Dev Tools:'</div>
        {refreshMessage}

        <div style={{fontSize: 'small'}}>
          <div style={{display: 'inline-block', width: '30%', overflow: 'hidden'}}>Experiment</div>
          <div style={{display: 'inline-block', width: '20%', overflow: 'hidden'}}>UserId</div>
        </div>
        {Object.keys(alphaBetaMap).map(id => this.renderExperiment(id, alphaBetaMap[id]))}
        <div>
          {JSON.stringify(this.alphaBetaMap, null, 2)}
        </div>
      </div>
    );
  }
}

export default DevTools;
