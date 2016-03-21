import {experimentEndpoint} from './settings';

export function postExperimentData(experimentId, variant, success = null, impressionId = null) {
  return fetch(experimentEndpoint + '/' + experimentId + '/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variant: variant,
      success: success,
      impressionId: impressionId,
    }),
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
