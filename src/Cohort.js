import { localStorageKey } from './constants';

export function isInCohort(experimentParams) {
  let alphaBetaMap;
  try {
    const jsonStr = global.localStorage.getItem(localStorageKey);
    alphaBetaMap = jsonStr && JSON.parse(jsonStr) || {};
  } catch (err) {
    alphaBetaMap = {};
  }

  if (!(experimentParams.id in alphaBetaMap)) {
    alphaBetaMap[experimentParams.id] = Math.random();
    const jsonStr = JSON.stringify(alphaBetaMap);
    global.localStorage.setItem(localStorageKey, jsonStr);
  }
  return (alphaBetaMap[experimentParams.id] < experimentParams.testCohortSize);
}
