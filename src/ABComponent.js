/**
 * @fileOverview Given two variants of React Component (or Element), it displays
 * the appropriate one depending on the experiment context.
 */

import React from 'react';

import { isInCohort } from './Cohort';
import { localStorageKey } from './constants';
import {
  postExperimentData,
} from './Experiment';

class ABComponent extends React.Component {
  static displayName = 'ABComponent';

  static propTypes = {
    experimentParams: React.PropTypes.object,
    // ComponentA/B can be either React element or React component.
    ComponentA: React.PropTypes.oneOfType([
      React.PropTypes.element,
      // https://github.com/facebook/react/issues/5143#issuecomment-147473269
      React.PropTypes.oneOfType(
        [React.PropTypes.string, React.PropTypes.func]
      ),
    ]),
    ComponentB: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.oneOfType(
        [React.PropTypes.string, React.PropTypes.func]
      ),
    ]),
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
    this.setState({
      isInCohort: isInCohort(this.props.experimentParams),
    });
    global.addEventListener('storage', this.onStorageEvent);
  }

  componentDidMount() {
    // Determine an exposable label for the fields shown
    // TODO: Make this a bit more user facing
    const variant = this.state.isInCohort ? 'b' : 'a';

    // Record that the AlphaBeta component was loaded
    const experimentId = this.props.experimentParams.id;
    postExperimentData(experimentId, variant, false);
  }

  componentWillUnmount() {
    global.removeEventListener('storage', this.onStorageEvent);
  }

  successAction = (...args) => {
    // TODO: Move this up to be a method
    const variant = this.state.isInCohort ? 'b' : 'a';

    const experimentId = this.props.experimentParams.id;
    postExperimentData(experimentId, variant, true);
    if (this.props.successAction) {
      this.props.successAction(...args);
    }
  }

  onStorageEvent = (event) => {
    if (event.key === localStorageKey) {
      this.setState({
        isInCohort: isInCohort(this.props.experimentParams),
      });
    }
  };

  /**
   * Whether it is passed React element or React component, it renders accordingly.
   * It also injects `successAction` into the props.
   * @param  {React.Component|React.element} elemOrComp
   * @return {React.element}
   */
  renderElementOrComponent(elemOrComp) {
    const props = {
      successAction: this.successAction,
    };
    return React.isValidElement(elemOrComp)
        ? React.cloneElement(elemOrComp, props)
        : React.createElement(elemOrComp, props);
  }

  render() {
    const { ComponentA, ComponentB } = this.props;
    return this.state.isInCohort
        ? this.renderElementOrComponent(ComponentB)
        : this.renderElementOrComponent(ComponentA);
  }
}

export default ABComponent;
