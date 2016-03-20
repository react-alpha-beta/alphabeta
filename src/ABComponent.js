import React from 'react';

// RFC4122 version 4 compliant solution.
// http://stackoverflow.com/a/2117523/448017
const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
  const r = Math.random() * 16 | 0;
  const v = (c === 'x') ? r : (r & 0x3 | 0x8);
  return v.toString(16);
});

const STORAGE_PREFIX = '_alphabeta';

const alphabetaId = global.localStorage.getItem(STORAGE_PREFIX) || uuid();
global.localStorage.setItem(STORAGE_PREFIX, alphabetaId);


class ABComponent extends React.Component {
  static displayName = 'ABComponent';

  static propTypes = {
    experimentId: React.PropTypes.string.isRequired,
    variants: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        // https://github.com/facebook/react/issues/5143#issuecomment-147473269
        component: React.PropTypes.oneOfType(
          [React.PropTypes.string, React.PropTypes.func]
        ),
        // How much percentage of the population will see this variation.
        occurrence: React.PropTypes.number,
      }),
    ),

    // successAction: React.PropTypes.func,
    // passThruProperties: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    const experimentKey = `${STORAGE_PREFIX}-${props.experimentId}`;
    // random number between [0, 1)
    let randomNumber = global.localStorage.getItem(experimentKey);
    if (randomNumber === null) {
      randomNumber = Math.random();
      global.localStorage.setItem(experimentKey, randomNumber);
    }

    this.state = {
      randomNumber: randomNumber,
    };
  }

  onSuccessAction = (event) => {
    // fire the successAction event
    this.props.successAction(event);
  };

  // Gets the appropriate variant according to `randomNumber`
  getVariant(randomNumber) {
    const { variants } = this.props;
    let ChosenComponent;
    let cumulativeDistribution = 0;
    for (let i = 0, l = variants.length; i < l; i++) {
      cumulativeDistribution = cumulativeDistribution + variants[i].occurrence;
      if (randomNumber < cumulativeDistribution) {
        ChosenComponent = variants[i].component;
        break;
      }
    }
    return ChosenComponent;
  }

  render() {
    const ChosenComponent = this.getVariant(this.state.randomNumber);
    return (
      <ChosenComponent />
    );
  }
}

export default ABComponent;
