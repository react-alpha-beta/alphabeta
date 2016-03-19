import React from 'react';
import ReactDOM from 'react-dom';

// Copies files to webpack output folder.
import './index.html';
import './main.css';

class Page extends React.Component {
  render() {
    return (
      <div>

      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('app')
);
