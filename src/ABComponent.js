import React from 'react';

import {isInCohort} from './Cohort';
import {postExperimentData} from './Experiment';

class AlphaBetaComponent extends React.Component {
  // static displayName =

  static propTypes = {
    experimentParams: React.PropTypes.object,
    ComponentA: React.PropTypes.func,
    ComponentB: React.PropTypes.func,
    successAction: React.PropTypes.func,
    // cohortStore: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isInCohort: false,
    };
  }

  componentWillMount() {
    if (isInCohort(this.props.experimentParams) === true) {
      this.setState({
        isInCohort: true,
      });
    }
  }

  componentDidMount() {
    // record that the AlphaBeta component was loaded
    let variant;
    if (this.state.isInCohort === true) {
      variant = 'b';
    } else {
      variant = 'a';
    }
    postExperimentData(this.props.experimentParams.id, variant);
  }

  successAction = (...args) => {
    // record that successAction occured
    let variant;
    if (this.state.isInCohort === true) {
      variant = 'b';
    } else {
      variant = 'a';
    }
    postExperimentData(this.props.experimentParams.id, variant, true);
    // fire the successAction event
    this.props.successAction(...args);
  };

  render() {
    const { ComponentA, ComponentB } = this.props;

    if (this.state.isInCohort === true) {
      return (
        <ComponentB successAction={this.successAction} />
      );
    }
    return (
      <ComponentA successAction={this.successAction} />
    );
  }
}

export default AlphaBetaComponent;
