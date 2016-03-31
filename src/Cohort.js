/* Export a function when passed an `experimentParams` dict
 with `id` and `testCohortSize` keys determines if an experiment
 should take the expierment

@params {string} testId: Any valid dict key
@params {number} testCohortSize - Number between 0-1,
to indicate fraction of users to test with  cohert test size

*/
import { localStorageKey } from './constants';

export function isInCohort(experimentParams) {
  /*
  Function stores a global registery of experiments in a dict
  this consists of a mapping of experiment ids to random numbers,
  that can then be used to determine if the user is in the cohort
  for that experiment.
  */
  const experimentId = experimentParams.id;

  // Retrieve from storage or create experiment registery
  let alphaBetaMap;
  try {
    const jsonStr = global.localStorage.getItem(localStorageKey);
    alphaBetaMap = jsonStr && JSON.parse(jsonStr) || {};
  } catch (err) {
    alphaBetaMap = {};
  }

  // Get and set a random number (<1) in the registery of the experimentId
  if (!(experimentId in alphaBetaMap)) {
    alphaBetaMap[experimentId] = Math.random();
    const jsonStr = JSON.stringify(alphaBetaMap);
    global.localStorage.setItem(localStorageKey, jsonStr);
  }

  // Return if this user is in the experiment,
  // if they are below the treshold they are in the cohort
  return (alphaBetaMap[experimentId] < experimentParams.testCohortSize);
}
