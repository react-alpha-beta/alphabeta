import React from 'react';
import ReactDOM from 'react-dom';

import './index.html';
import './main.css';

import ButtonA from './components/ButtonA';
import ButtonB from './components/ButtonB';

class Page extends React.Component {
  render() {
    return (
      <div>
        <ButtonA />
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('app')
);
