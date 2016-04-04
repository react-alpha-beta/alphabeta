import React from 'react';
import { getExperimentDataCallback } from '../src/Experiment';
import { expect } from 'chai';

const jsonFixture = {
  "variant_a_trial_count": 10,
  "variant_b_trial_count": 10,
  "variant_a_success_count": 5,
  "variant_b_success_count": 5
};


describe("Experiment Endpoint", () => {

  describe("Calculate ", () => {
    it('should calculate and return the mean for A', () => {
      const experimentData = getExperimentDataCallback(jsonFixture);
      const aData = experimentData["a"];

      //Calculate directly from fixture data
      const aFixtureTrialCount = jsonFixture["variant_a_trial_count"];
      const aFixtureSuccessCount = jsonFixture["variant_a_success_count"];
      const aCalculatedMean = aFixtureSuccessCount / aFixtureTrialCount;

      expect(aData.mean).to.equal(aCalculatedMean);
    });

    it('should calculate and return the mean for B', () => {
      const experimentData = getExperimentDataCallback(jsonFixture);
      const bData = experimentData["b"];

      //Calculate directly from fixture data
      const bFixtureTrialCount = jsonFixture["variant_b_trial_count"];
      const bFixtureSuccessCount = jsonFixture["variant_a_success_count"];
      const bCalculatedMean = bFixtureSuccessCount / bFixtureTrialCount;

      //Compared calcualted and functional
      expect(bData.mean).to.equal(bCalculatedMean);
    });

    it('it should calculate and return the mean for B', () => {
    });

  })
})
