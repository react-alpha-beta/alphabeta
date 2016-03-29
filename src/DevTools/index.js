import React from 'react';

import { localStorageKey } from '../constants';
import style from './style.module.css';

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
      <div className={style.experiment}>
        <label>{id}</label>
        <input type="range" min="0" max="1" step="0.01" name={id} value={value} onChange={this.onChange} />
      </div>
    );
  }

  render() {
    const { alphaBetaMap } = this.state;
    return (
      <div className={style.devtools}>
        {Object.keys(alphaBetaMap).map(id => this.renderExperiment(id, alphaBetaMap[id]))}
        <div>
          {JSON.stringify(this.alphaBetaMap, null, 2)}
        </div>
      </div>
    );
  }
}

export default DevTools;
