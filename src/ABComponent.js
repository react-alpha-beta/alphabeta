/* Core component, passed two React Components (or Elements)
and displays a given one depending on the experimental context */

import React from 'react';

import { isInCohort } from './Cohort';
import { localStorageKey } from './constants';
import { postExperimentData } from './Experiment';

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
    /*
    Assume user is not in the cohort
    */
    super(props);
    this.state = {
      isInCohort: false,
    };
  }

  componentWillMount() {
    this.setState({
      /* Determine if the user is in the cohort
         As a function of the experimentParams
      */
      isInCohort: isInCohort(this.props.experimentParams),
    });

    /* Remove listening to local storage
       for events involving this key */
    global.addEventListener('storage', this.onStorageEvent);
  }

  componentDidMount() {
    /* Determine an exposable label for the fields shown
       TODO: Make this a bit more user facing
    */
    const variant = this.state.isInCohort ? 'b' : 'a';

    // Record that the AlphaBeta component was loaded
    const experimentId = this.props.experimentParams.id;
    postExperimentData(experimentId, variant, false);
  }

  componentWillUnmount() {
    /* Remove listening to storage */
    global.removeEventListener('storage', this.onStorageEvent);
  }

  successAction = (...args) => {
    /* Record that successAction occured */

    // TODO: Move this up to be a method
    const variant = this.state.isInCohort ? 'b' : 'a';

    const experimentId = this.props.experimentParams.id;
    postExperimentData(experimentId, variant, true);
    if (typeof this.props.successAction !== undefined) {
      // fire the successAction event only if it was passed down to the variant
      // components
      this.props.successAction(...args);
    }
  }

  onStorageEvent = (event) => {
    /* If storage event key matches */
    if (event.key === localStorageKey) {
      this.setState({
        isInCohort: isInCohort(this.props.experimentParams),
      });
    }
  };

  renderElementOrComponent(elemOrComp) {
    /* Wrapper to standardise being passed either
       React element or React component

       Injecting successAction into their props
    */
    const props = {
      successAction: this.successAction,
    };
    return React.isValidElement(elemOrComp)
        ? React.cloneElement(elemOrComp, props)
        : React.createElement(elemOrComp, props);
  }

  render() {
    /* Render A/B depending ong the  */
    const { ComponentA, ComponentB } = this.props;
    return this.state.isInCohort
        ? this.renderElementOrComponent(ComponentB)
        : this.renderElementOrComponent(ComponentA);
  }
}

export default ABComponent;
