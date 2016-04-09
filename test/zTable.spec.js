import { expect } from 'chai';

import { zScoreByConfidenceInterval } from '../src/zTable';

describe('zTable', () => {
  it('should return correct z-score for one tailed tests', () => {
    expect(zScoreByConfidenceInterval(0.95, false)).to.equal(1.65);
  });

  it('should return correct z-score for two tailed tests', () => {
    expect(zScoreByConfidenceInterval(0.95)).to.equal(1.96);
  });
});
