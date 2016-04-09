import fetch from 'isomorphic-fetch';

import config from './config';
import { zScoreByConfidenceInterval } from './zTable';

export function postExperimentData(experimentId, variant, success = null, metaId = null) {
  return fetch(`${config.endPoint}/${experimentId}/`, {
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
 * Function to return the pooled estimate of the common standard deviation (Sp).
 */
function getPooledVariance(trialsA, trialsB, successA, successB) {
  const successPooled = (successA + successB) / (trialsA + trialsB);
  return Math.sqrt((successPooled * (1 - successPooled) ) * ((1 / trialsA) + (1 / trialsB)));
}

function assumeNormalDistrabution(trials, probabilityMean) {
  // heuristic: when the # of trials * the mean probability of success is > 5,
  // it's safe to assume the normal distrabution can be used (instead of the
  // binomieal distrabution)
  if (trials * probabilityMean > 5) {
    return true;
  }
  return false;
}

function testDetails(probabilityMeanDifference, marginOfError, confidenceInterval) {
  // a function that turns the numeric data from a test into a short, human readable
  // description of the findings
  const differenceFloor = probabilityMeanDifference - marginOfError;
  const differenceCeiling = probabilityMeanDifference + marginOfError;

  let details;
  const range = 'We are ' + Math.round(confidenceInterval * 100, -2) + '% confident the true difference is between ' + Math.round(differenceFloor * 100, -2) + '% and ' + Math.round(differenceCeiling * 100, -2) + '%.';
  let recommendation;
  if (probabilityMeanDifference > 0) {
    details = 'Our best estimate is that the absolute rate of success is ' + Math.round(Math.abs(probabilityMeanDifference) * 100, -2) + '% higher with variant B';
  } else {
    details = 'Our best estimate is that the absolute rate of success is ' + Math.round(Math.abs(probabilityMeanDifference) * 100, -2) + '% lower with variant B';
  }

  if (differenceFloor * differenceCeiling > 0) {
    details = details + ', and this result is statistically significant';
    if (probabilityMeanDifference > 0) {
      recommendation = 'It looks like a safe bet to go with variant B.';
    } else {
      recommendation = 'Given this information, you should probably stick with variant A.';
    }
  } else {
    details = details + ', but this result is not statistically significant';
    recommendation = 'You don\'t yet have enough information to make a confident decision, so you should keep running this experiment.';
  }
  return details + ' (' + range + '). ' + recommendation;
}

  // let description = "Our best guess is that the absolute rate of success is xxx LOWER|HIGHER for variant B as compared to variant A."
  // description = description + "This result IS|IS NOT statistically significant to CI confidence (we are CI confident that the true difference in rate of success is between FLOOR and CEILING."


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

  const assumeNormalDistrabutionA = assumeNormalDistrabution(variantATrialCount, probabilityMeanA);
  const assumeNormalDistrabutionB = assumeNormalDistrabution(variantBTrialCount, probabilityMeanB);

  const marginOfError = zScore * probabilityVariancePooled * Math.sqrt((1 / variantATrialCount) + (1 / variantBTrialCount));
  const differenceFloor = probabilityMeanDifference - marginOfError;
  const differenceCeiling = probabilityMeanDifference + marginOfError;
  // const confidenceIntervalAsPercentage = Math.round(confidenceInterval * 100, -2);

  if (assumeNormalDistrabutionA === false || assumeNormalDistrabutionB === false) {
    return {
      statisticalSignificance: false,
      details: 'You do not have enough sample data for one or both of your variants to make any assertions.',
    };
  }

  if (varianceRatio <= 0.5 || varianceRatio >= 2) {
    // heuristic: when one variance is more than double the other, we cannot use the
    // pooled estimate of the common standard deviation.

    // TODO: we must account for the heterogeneity in variances
    return {
      statisticalSignificance: false,
      details: 'Your varianceRatio is not between 0.5 and 2 in order to make an assertion.',
    };
  }

  let statisticalSignificance;
  if (differenceFloor * differenceCeiling > 0) {
    statisticalSignificance = true;
  } else {
    statisticalSignificance = false;
  }

  return {
    statisticalSignificance: statisticalSignificance,
    meanDifferenceValue: probabilityMeanDifference,
    marginOfError: marginOfError,
    details: testDetails(probabilityMeanDifference, marginOfError, confidenceInterval),
  };
}

export function getExperimentData(experimentId) {
  return fetch(`${config.endPoint}/${experimentId}/`, {
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
