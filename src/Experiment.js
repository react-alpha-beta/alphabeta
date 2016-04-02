import fetch from 'isomorphic-fetch';

import { SETTINGS } from './defaultSettings';

export function postExperimentData(experimentId, variant, success = null, metaId = null) {
  let alphaBetaEndpoint = process.env.ALPHA_BETA_ENDPOINT;
  if (alphaBetaEndpoint === undefined) {
    alphaBetaEndpoint = SETTINGS.experimentEndPoint;
  }
  return fetch(alphaBetaEndpoint + '/' + experimentId + '/', {
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

function getExperimentDataCallback(json) {
  const variantATrialCount =  json.variant_a_trial_count;
  const variantBTrialCount =  json.variant_b_trial_count;
  const variantASuccessCount =  json.variant_a_success_count;
  const variantBSuccessCount =  json.variant_b_success_count;

  const probabilityMeanA = variantASuccessCount / variantATrialCount;
  const probabilityMeanB = variantBSuccessCount / variantBTrialCount;
  const probabilityVarianceA = variantATrialCount * probabilityMeanA * (1 - probabilityMeanA);
  const probabilityVarianceB = variantBTrialCount * probabilityMeanB * (1 - probabilityMeanB);

  let confidenceIntervalA;
  if (variantATrialCount * probabilityMeanA > 5){
    // safe to use normal distrabution
    confidenceIntervalA = zScore * probabilityVarianceA;
  } else {
    // cannot use normal distrabution, use binomieal dist
    confidenceIntervalA = zScore * Math.sqrt((probabilityMeanA * (1 - probabilityMeanA)) / variantATrialCount);
  }

  console.log('probabilityMeanA: ' + confidenceIntervalA);
  // console.log('probabilityVarianceA: ' + probabilityVarianceA);
  // console.log('probabilityMeanB: ' + probabilityMeanB);
  // console.log('probabilityVarianceB: ' + probabilityVarianceB);
}

export function getExperimentData(experimentId) {
  let alphaBetaEndpoint = process.env.ALPHA_BETA_ENDPOINT;
  if (alphaBetaEndpoint === undefined) {
    alphaBetaEndpoint = SETTINGS.experimentEndPoint;
  }
  return fetch(alphaBetaEndpoint + '/' + experimentId + '/', {
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
