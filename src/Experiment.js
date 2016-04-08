import fetch from 'isomorphic-fetch';

import { endPoint } from './config';
import {zScoreByConfidenceInterval} from './zTable';

export function postExperimentData(experimentId, variant, success = null, metaId = null) {
  return fetch(`${endPoint}/${experimentId}/`, {
  // return fetch(`http://127.0.0.1:8000/api/alphabeta/${experimentId}/`, {

    method: 'PATCH',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      experimentId: experimentId,
      metaId: metaId,
      success: success,
      userId: JSON.parse(global.localStorage.getItem('alphaBetaMap'))[experimentId],
      variant: variant,
    }),
  });
}

/**
* Function to return the pooled estimate of the common standard deviation (Sp)
**/
function getPooledVariance(trialsA, trialsB, successA, successB) {
  const successPooled = (successA + successB) / (trialsA + trialsB);
  return Math.sqrt((successPooled * (1 - successPooled) ) * ((1 / trialsA) + (1 / trialsB)));
  // const varianceASquared = Math.pow(varianceA, 2);
  // const varianceBSquared = Math.pow(varianceB, 2);
  // const numerator = ((trialsA - 1) * varianceASquared) + ((trialsB - 1) * varianceBSquared);
  // const denominator = (trialsA + trialsB) - 2;
  // return Math.sqrt(numerator / denominator);
}

function getExperimentDataCallback(json, confidenceInterval = 0.95) {
  const variantATrialCount =  json.variant_a_trial_count;
  const variantBTrialCount =  json.variant_b_trial_count;
  const variantASuccessCount =  json.variant_a_success_count;
  const variantBSuccessCount =  json.variant_b_success_count;

  const probabilityMeanA = variantASuccessCount / variantATrialCount;
  const probabilityMeanB = variantBSuccessCount / variantBTrialCount;
  const probabilityMeanDifference = probabilityMeanB - probabilityMeanA;
  const probabilityVarianceA = variantATrialCount * probabilityMeanA * (1 - probabilityMeanA);
  const probabilityVarianceB = variantBTrialCount * probabilityMeanB * (1 - probabilityMeanB);
  const varianceRatio = probabilityVarianceA / probabilityVarianceB;
  const probabilityVariancePooled = getPooledVariance(
    variantATrialCount, variantBTrialCount, variantASuccessCount, variantBSuccessCount
  );
  const zScore = zScoreByConfidenceInterval(confidenceInterval);

  if (varianceRatio > 0.5 && varianceRatio < 2) {
    // heuristic: when one variance is no more than double the other, we can use the
    // pooled estimate of the common standard deviation.
    const marginOfError = zScore * probabilityVariancePooled * Math.sqrt((1 / variantATrialCount) + (1 / variantBTrialCount));
    const differenceFloor = probabilityMeanDifference - marginOfError;
    const differenceCeiling = probabilityMeanDifference + marginOfError;
    const confidenceIntervalAsPercentage = Math.round(confidenceInterval * 100, -2);

    console.log('differenceFloor: ' + differenceFloor);
    console.log('differenceCeiling: ' + differenceCeiling);

    if ((differenceFloor > 0) === (differenceCeiling > 0)) {
      // there is a statistically significant difference between these two variants
      console.log('We are ' + confidenceIntervalAsPercentage + '% certain that one variant is better.');
    } else {
      // there is no statistically significant difference between these two variants
      console.log('We cannot say with ' + confidenceIntervalAsPercentage + '% certainty that one variant is better.');
    }
  } else {
    // TODO: we must account for the heterogeneity in variances
    const error = new Error('Your varianceRatio is not between 0.5 and 2');
    throw error;
  }
}

export function getExperimentData(experimentId) {
  return fetch(`${endPoint}/${experimentId}/`, {
  // return fetch(`http://127.0.0.1:8000/api/alphabeta/${experimentId}/`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(json => {
    getExperimentDataCallback(json);
  });
}

// experiments should look something like this
// {
//   experimentId: {
//     ditrabutionType: "normal",
//     testCohortSize: "10%",
//     successThreshold: "95%" (default=null),
//     experimentStartTime: (default= now),
//     experimentEndTime: (default= never, ie once successThreshold is met),
//     // a: {
//     //   mean: ?,
//     //   confidenceInterval: 93%,
//     // },
//     // b: {
//     //   mean: ?,
//     //   confidenceInterval: 93%,
//     // },
//     // comparison: {
//     //   winnter: "94% certain A is between better",
//     // }
//   }
// }
