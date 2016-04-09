import { expect } from 'chai';

import { zScoreByConfidenceInterval } from '../src/zTable';

describe('zTable', () => {
  describe('one tailed tests', () => {
    it('should return correct z-score', () => {
      expect(zScoreByConfidenceInterval(0.95, false)).to.equal(1.65);
    });

    it('should throw if confidenceInterval is out of range', () => {
      expect(() => zScoreByConfidenceInterval(0.4999, false)).to.throw(Error);
      expect(() => zScoreByConfidenceInterval(0.9999, false)).to.throw(Error);
    });
  });

  describe('two tailed tests', () => {
    it('should return correct z-score', () => {
      expect(zScoreByConfidenceInterval(0.95)).to.equal(1.96);
    });

    it('should throw if confidenceInterval is out of range', () => {
      expect(() => zScoreByConfidenceInterval(0.9997)).to.throw(Error);
    });
  });
});
