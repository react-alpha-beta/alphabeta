export function isInCohort(experimentParams) {
  let alphaBetaMap = window.localStorage.getItem('alphaBetaMap');
  if (alphaBetaMap === null) {
    alphaBetaMap = {};
  }
  if (!experimentParams.id in alphaBetaMap) {
    alphaBetaMap[experimentParams.id] = Math.random();
    window.localStorage.setItem('alphaBetaMap', alphaBetaMap);
  }
  if (alphaBetaMap[experimentParams.id] <= experimentParams.testCohortSize) {
    return true;
  }
  return false;
}
