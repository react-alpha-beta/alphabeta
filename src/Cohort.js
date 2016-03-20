export function isInCohort(experimentParams) {
  let alphaBetaMap;
  try {
    const jsonStr = global.localStorage.getItem('alphaBetaMap');
    alphaBetaMap = jsonStr && JSON.parse(jsonStr) || {};
  } catch (err) {
    alphaBetaMap = {};
  }

  if (!(experimentParams.id in alphaBetaMap)) {
    alphaBetaMap[experimentParams.id] = Math.random();
    const jsonStr = JSON.stringify(alphaBetaMap);
    global.localStorage.setItem('alphaBetaMap', jsonStr);
  }
  return (alphaBetaMap[experimentParams.id] <= experimentParams.testCohortSize);
}
