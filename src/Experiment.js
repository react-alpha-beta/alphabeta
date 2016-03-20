import {experimentEndpoint} from './settings';

export function postExperimentData(experimentId, variant, success = null) {
  return fetch(experimentEndpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      experimentId: experimentId,
      variant: variant,
      success: success,
    }),
  });
}
