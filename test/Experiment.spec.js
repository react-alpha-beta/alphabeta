import { expect } from 'chai';

import {
  assumeNormalDistribution,
  getPooledStandardDeviation,
  computeStats,
} from '../src/Experiment';

describe('Experiment', () => {
  describe('assumeNormalDistribution()', () => {
    it('should return true', () => {
      expect(assumeNormalDistribution(100, 0.1)).to.be.true;
      expect(assumeNormalDistribution(10, 0.6)).to.be.true;
    });

    it('should return false', () => {
      expect(assumeNormalDistribution(100, 0.05)).to.be.false;
      expect(assumeNormalDistribution(10, 0.05)).to.be.false;
    });
  });

  describe('getPooledStandardDeviation()', () => {
    it('should return the correct pooled standard deviation', () => {
      const pooledStd = getPooledStandardDeviation(100, 200, 20, 35);
      expect(pooledStd).to.equal(0.0473902240270431);
    });
  });

  describe('computeStats()', () => {
    it('should have no significance due to not enough sample data', () => {
      const stats = computeStats({
        variant_a_trial_count: 100,
        variant_b_trial_count: 200,
        variant_a_success_count: 5,
        variant_b_success_count: 50,
      }, 0.95);
      delete stats.details;
      expect(stats).to.eql({
        statisticalSignificance: false,
      });
    });

    it('should have no statistical significance', () => {
      const stats = computeStats({
        variant_a_trial_count: 100,
        variant_b_trial_count: 200,
        variant_a_success_count: 10,
        variant_b_success_count: 20,
      }, 0.95);
      delete stats.details;
      expect(stats).to.eql({
        statisticalSignificance: false,
      });
    });

    it('should have statistical significance', () => {
      const stats = computeStats({
        variant_a_trial_count: 1000,
        variant_b_trial_count: 1000,
        variant_a_success_count: 100,
        variant_b_success_count: 110,
      }, 0.95);
      delete stats.details;
      expect(stats).to.eql({
        statisticalSignificance: true,
        marginOfError: 0.0012016894107879958,
        meanDifferenceValue: 0.009999999999999995,
      });
    });
  });
});
