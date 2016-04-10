import fetch from 'isomorphic-fetch';

import config from './config';
import { zScoreByConfidenceInterval } from './zTable';

export function postExperimentData(experimentId, variant, success = null, metaId = null) {
  return fetch(`${config.endPoint}/${experimentId}/`, {
    method: 'POST',
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

export function getPooledVariance(trialsA, trialsB, successA, successB) {
  const successPooled = (successA + successB) / (trialsA + trialsB);
  return (successPooled * (1 - successPooled)) * ((1 / trialsA) + (1 / trialsB));
}

/**
 * Function to return the pooled estimate of the common standard deviation (Sp).
 */
export function getPooledStandardDeviation(trialsA, trialsB, successA, successB) {
  return Math.sqrt(getPooledVariance(trialsA, trialsB, successA, successB));
}

export function getUnpooledVariance(trialsA, trialsB, varianceA, varianceB) {
  return Math.sqrt(
    (varianceA / trialsA) + (varianceB / trialsB)
  );
}

export function assumeNormalDistribution(trials, probabilityMean) {
  // heuristic: when the # of trials * the mean probability of success is > 5,
  // it's safe to assume the normal distrabution can be used (instead of the
  // binomieal distrabution)
  return (trials * probabilityMean > 5);
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

export function computeStats(json) {
  const variantATrialCount = json.variantA.trialCount;
  const variantBTrialCount = json.variantB.trialCount;
  const variantASuccessCount = json.variantA.successCount;
  const variantBSuccessCount = json.variantB.successCount;
  const confidenceInterval = json.confidenceInterval;

  const probabilityMeanA = variantASuccessCount / variantATrialCount;
  const probabilityMeanB = variantBSuccessCount / variantBTrialCount;
  const probabilityMeanDifference = probabilityMeanB - probabilityMeanA;
  const probabilityVarianceA = variantATrialCount * probabilityMeanA * (1 - probabilityMeanA);
  const probabilityVarianceB = variantBTrialCount * probabilityMeanB * (1 - probabilityMeanB);
  const varianceRatio = probabilityVarianceA / probabilityVarianceB;
  const probabilityVariancePooled = getPooledStandardDeviation(
    variantATrialCount,
    variantBTrialCount,
    variantASuccessCount,
    variantBSuccessCount
  );
  const probabilityVarianceUnpooled = getUnpooledVariance(
    variantATrialCount, variantBTrialCount, probabilityVarianceA, probabilityVarianceB
  );
  const zScore = zScoreByConfidenceInterval(confidenceInterval);

  const assumeNormalDistributionA = assumeNormalDistribution(variantATrialCount, probabilityMeanA);
  const assumeNormalDistributionB = assumeNormalDistribution(variantBTrialCount, probabilityMeanB);

  if (assumeNormalDistributionA === false || assumeNormalDistributionB === false) {
    return {
      statisticalSignificance: false,
      details: 'You do not have enough sample data for one or both of your variants to make any assertions.',
    };
  }

  let marginOfError;
  if (varianceRatio <= 0.5 || varianceRatio >= 2) {
    // heuristic: when one variance is more than double the other, we cannot use the
    // pooled estimate of the common standard deviation.
    marginOfError = zScore * probabilityVarianceUnpooled * Math.sqrt((1 / variantATrialCount) + (1 / variantBTrialCount));
  } else {
    marginOfError = zScore * probabilityVariancePooled * Math.sqrt((1 / variantATrialCount) + (1 / variantBTrialCount));
  }

  const differenceFloor = probabilityMeanDifference - marginOfError;
  const differenceCeiling = probabilityMeanDifference + marginOfError;
  const statisticalSignificance = (differenceFloor * differenceCeiling > 0);

  const result = {
    statisticalSignificance: statisticalSignificance,
    meanDifferenceValue: probabilityMeanDifference,
    marginOfError: marginOfError,
    details: testDetails(probabilityMeanDifference, marginOfError, confidenceInterval),
  };
  return result;
}

export function getExperimentData(experimentId) {
  return fetch(`${config.endPoint}/${experimentId}/`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(json => {
    computeStats(json);
  });
}
