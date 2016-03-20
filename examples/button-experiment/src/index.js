import React from 'react';
import ReactDOM from 'react-dom';

import AlphaBetaComponent from '../../../src/ABComponent';

import './index.html';
import './main.css';

import ButtonA from './components/ButtonA';
import ButtonB from './components/ButtonB';

class Page extends React.Component {
  
  successAction(){
  	alert("Button Clicked");
  }

  render() {
    return (
      <div>
        <AlphaBetaComponent
        	successAction={this.successAction}
        	ComponentA={ButtonA}
        	ComponentB={ButtonB} 
        	experimentParams={{"id":'123'}}/>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('app')
);
