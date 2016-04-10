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
        variantA: {
          trialCount: 100,
          successCount: 5,
        },
        variantB: {
          trialCount: 200,
          successCount: 50,
        },
        confidenceInterval: 0.95,
      });
      delete stats.details;
      expect(stats).to.eql({
        statisticalSignificance: false,
      });
    });

    it('should have no statistical significance', () => {
      const stats = computeStats({
        variantA: {
          trialCount: 100,
          successCount: 10,
        },
        variantB: {
          trialCount: 200,
          successCount: 20,
        },
        confidenceInterval: 0.95,
      });
      delete stats.details;
      expect(stats).to.eql({
        statisticalSignificance: false,
        marginOfError: 0.10184458748504997,
        meanDifferenceValue: 0,
      });
    });

    it('should have statistical significance', () => {
      const stats = computeStats({
        variantA: {
          trialCount: 1000,
          successCount: 100,
        },
        variantB: {
          trialCount: 1000,
          successCount: 110,
        },
        confidenceInterval: 0.95,
      });
      delete stats.details;
      expect(stats).to.eql({
        statisticalSignificance: true,
        marginOfError: 0.0012016894107879958,
        meanDifferenceValue: 0.009999999999999995,
      });
    });

    it('should have statistical significance', () => {
      const stats = computeStats({
        variantA: {
          trialCount: 1000,
          successCount: 100,
        },
        variantB: {
          trialCount: 2000,
          successCount: 400,
        },
        confidenceInterval: 0.95,
      });
      delete stats.details;
      expect(stats).to.eql({
        statisticalSignificance: true,
        marginOfError: 0.037955236792832685,
        meanDifferenceValue: 0.1,
      });
    });
  });
});
