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
      <tr>
        <td>{id}</td>
        <td style={{ 'display': 'flex', 'paddingLeft': '1em' }}>
          0:<input type="range" min="0" max="1" step="0.01" name={id} value={value} onChange={this.onChange} />:1 ({value})
        </td>
      </tr>
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
        <label style={{'textDecoration': 'underline'}}>Dev Tools</label>
        {refreshMessage}
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(alphaBetaMap).map(id => this.renderExperiment(id, alphaBetaMap[id]))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DevTools;
