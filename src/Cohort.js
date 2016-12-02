import { localStorageKey } from './constants';

/**
 * Given an `experimentParams` object with `id` and `testCohortSize`,
 * it determines whether the user is in the control group or the experimental
 * group.
 * It maintains a global registery of experiments in an object. This consists of
 * a mapping of experiment ids to random numbers, that can be used to determine
 * if the user is in the experimental group or not.
 * @params {string} experimentParams.testId - Experiment id.
 * @params {number} experimentParams.testCohortSize - Number between 0 and 1
 * that indicates the portion of the users that need to be in the experimental
 * group.
 */
export function isInCohort(experimentParams) {
  const experimentId = experimentParams.id;

  // If the user doesn't have localStorage, do a 50/50 if they are in the cohort
  if (typeof(global.localStorage) === 'undefined') {
    return Math.random() < 0.5;
  }

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
