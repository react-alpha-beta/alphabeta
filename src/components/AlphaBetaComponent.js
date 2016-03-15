import React, { Component } from "react";

const getExperimentsUserIsPartOf = require("getExperimentsUserIsPartOf");

import {cohortRefreshRate} from "settings";


class AlphaBetaComponent extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    // };
  }

  static propTypes = {
    ComponetA: React.PropTypes.func,
    ComponetB: React.PropTypes.func, 
    successAction: React.PropTypes.func
  };

  componentDidMount(){
    // get (or set) this user's alphaBetaHash (for unique identification)
    let alphaBetaHash = window.localStorage.getItem("alphabeta");
    if (alphaBetaHash === null){
      alphaBetaHash = Math.random();
      window.localStorage.setItem("alphaBetaHash", alphaBetaHash);
    }

    // get (or set) this user's alphaBetaExperimentObj - a dictionary where each key
    // is the uniqueId of an experiment this user is currently part of
    let alphaBetaExperimentObj = window.localStorage.getItem("alphabetaexpdict");
    if (alphaBetaExperimentObj === null || alphaBetaExperimentObj.timestamp < ((Date.now() / 1000) - cohortRefreshRate)){
      // re-set this users alphaBetaExperimentObj
      alphaBetaExperimentObj = getExperimentsUserIsPartOf(alphaBetaHash);
      window.localStorage.setItem("alphaBetaExpDict", alphaBetaExperimentObj);
    }

    // TODO: record that the AlphaBeta component was loaded
    this.setState({alphaBetaExpDict: alphaBetaExperimentObj});
  }

  successAction = (event) => {
    // fire the successAction event
    this.props.successAction();
    // TODO: record that successAction occured
  }

  render() {
    const {ComponetA, ComponetB, passThruProperties} = this.props;

    if (this.props.cohortStore.inCohort === true){
      return <ComponetA passThruProperties={passThruProperties}
                        successAction={this.successAction.bind(event)} />;
    } else {
      return <ComponetB passThruProperties={passThruProperties}
                        successAction={this.successAction.bind(event)} />;
    }
  }
}

module.exports = AlphaBetaComponent;
