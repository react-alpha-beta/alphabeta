import fetch from 'isomorphic-fetch';

import { endPoint } from './config';

export function postExperimentData(experimentId, variant, success = null, metaId = null) {
  return fetch(`${endPoint}/${experimentId}/`, {
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

class ExperimentData {
  constructor(trialCount, trialSuccesses) {
    this.trialCount = trialCount;
    this.trialSuccesses = trialSuccesses;
    this.trialFailures = trialCount - trialSuccesses;
  }
  get mean() {
    return this.trialSuccesses / this.trialCount;
  }
  get variance() {
    // Success == 1
    // Failure == 0
    const mean = this.mean;
    const varianceFromSuccesses = this.trialSuccesses * Math.pow((1 - mean), 2);
    const varianceFromFailures = this.trialFailures * Math.pow((0 - mean), 2);
    return (varianceFromSuccesses + varianceFromFailures) / this.trialCount;
  }
  get sd() {
    return Math.sqrt(this.variance);
  }
}

class ExperimentCompare {
  constructor(experimentA, experimentB) {
    this.experimentA = experimentA;
    this.experimentB = experimentB;
  }

  get distributionType() {
    if ((experimentA.trialCount > 30) && (experimentB.trialCount > 30)) {
      return 'z-table';
    } else {
      return 't-table';
    }
  }

  get commonVariance() {
    const experimentA = this.experimentA;
    const experimentB = this.experimentB;
    const numerator = ((experimentA.trialCount - 1) * (experimentA.variance) +
                       (experimentB.trialCount - 1) * (experimentA.variance));
    const denominator = experimentA.trialCount + experimentB.trialCount - 2;
    return numerator / denominator;
  }

  get estimatedCommonStandardDeviation() {
    return Math.sqrt(this.commonVariance);
  }

  get confidenceInterval() {
    switch(this.distributionType) {
      case "z-table":
        return this._zBasedConfidence;
      case "t-table":
        return this._tBasedConfidence;
    }
  }

  get _zBasedConfidence() {
    const zScore = 1
    const sampleSizeFactor = Math.sqrt((1/(1+experimentA.trialCount)) +
                                       (1/(1+experimentB.trialCount)));
    return zScore * this.estimatedCommonStandardDeviation * sampleSizeFactor;
  }

  get _tBasedConfidence() {
    const tScore = 1
    const sampleSizeFactor = Math.sqrt((1/(1+experimentA.trialCount)) +
                                       (1/(1+experimentB.trialCount)));
    return tScore * this.estimatedCommonStandardDeviation * sampleSizeFactor;
  }

  get meanDifference() {
    return Math.abs(this.experimentA.mean - this.experimentB.mean);
  }

  get highestConversionExperiment() {
    if (this.experimentA.mean > this.experimentB.mean){
      return "A";
    } else {
      return "B";
    }
  }
  get humanReadableInterval() {
    // We are 95% confident that the difference in experiments is
    // between 0.44 and 2.96 %. Our best estimate of the difference,
    // the point estimate, is XX %. The standard error of the difference is %,
    // and the margin of error is % units.

    // We are 95% certain the difference in experiments is XXX, and 95% sure the range is between X and Y %
    const lowEstimate = this.meanDifference - _zBasedConfidence;
    const highEstimate = this.meanDifference + _zBasedConfidence;

    return `Our best estimate is experiment ${this.highestConversionExperiment} to
            be the highest converting experiment by ${this.meanDifference}, and we
            are 95% the difference is in the range between ${lowEstimate} - ${highEstimate}`;
  }

}

export function getExperimentDataCallback(json) {
  const experimentA = new ExperimentData(json.variant_a_trial_count,
                                         json.variant_a_success_count);
  const experimentB = new ExperimentData(json.variant_b_trial_count,
                                         json.variant_b_success_count);

  const probabilityMeanA = experimentA.mean;
  const probabilityMeanB = experimentB.mean;
  const comparison = new ExperimentCompare(experimentA, experimentB);
  // const probabilityVarianceA = variantATrialCount * probabilityMeanA * (1 - probabilityMeanA);
  // const probabilityVarianceB = variantBTrialCount * probabilityMeanB * (1 - probabilityMeanB);

  // let confidenceIntervalA;
  // let ditrabutionType;
  // if (variantATrialCount * probabilityMeanA > 5) {
  //   // safe to use normal distribution
  //   ditrabutionType = "normal"
  //   confidenceIntervalA = 1 //zScore * probabilityVarianceA;
  // } else {
  //   // cannot use normal distribution, use binomial dist
  //   ditrabutionType = "binomial"
  //   confidenceIntervalA = 2 //zScore * Math.sqrt((probabilityMeanA * (1 - probabilityMeanA)) / variantATrialCount);
  // }

  var confidenceIntervalB = 0;
  return {
    distributionType: "normal",
    testCohortSize: 0.10,
    successThreshold: 0.95,
    //experimentStartTime: (default= now),
    //experimentEndTime: (default= never, ie once successThreshold is met),
    a: {
      mean: probabilityMeanA,
      confidenceInterval: "confidenceIntervalA",
    },
    b: {
      mean: probabilityMeanB,
      confidenceInterval: "confidenceIntervalB",
    },
    comparison: {
      winnter: "94% certain A is between better",
    }
  }
  // return {confidenceIntervalA}
  // console.log('probabilityMeanA: ' + confidenceIntervalA);
  // console.log('probabilityVarianceA: ' + probabilityVarianceA);
  // console.log('probabilityMeanB: ' + probabilityMeanB);
  // console.log('probabilityVarianceB: ' + probabilityVarianceB);
}

export function getExperimentData(experimentId) {
  return fetch(`${endPoint}/${experimentId}/`, {
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
