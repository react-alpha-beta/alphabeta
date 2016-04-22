import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import { ButtonA, ButtonB } from './fixture';
import { ABComponent } from '../src';

describe('<ABComponent />', () => {
  beforeEach(() => {
    global.localStorage.clear();
  });

  describe('A or B being Component', () => {
    it('should render <ButtonA /> when random number is 0.4 and testCohortSize is 0.4', () => {
      Math.random = () => 0.4;
      const wrapper = mount(
        <ABComponent
          experimentParams={{
            id: 'button-experiment',
            testCohortSize: 0.4,
          }}
          ComponentA={ButtonA}
          ComponentB={ButtonB} />
      );
      expect(wrapper.text()).to.equal('ButtonA');
    });

    it('should render <ButtonA /> when random number is 0.7 and testCohortSize is 0.4', () => {
      Math.random = () => 0.7;
      const wrapper = mount(
        <ABComponent
          experimentParams={{
            id: 'button-experiment',
            testCohortSize: 0.4,
          }}
          ComponentA={ButtonA}
          ComponentB={ButtonB} />
      );
      expect(wrapper.text()).to.equal('ButtonA');
    });

    it('should render <ButtonB /> when random number is 0.39 and testCohortSize is 0.4', () => {
      Math.random = () => 0.39;
      const wrapper = mount(
        <ABComponent
          experimentParams={{
            id: 'button-experiment',
            testCohortSize: 0.4,
          }}
          ComponentA={ButtonA}
          ComponentB={ButtonB} />
      );
      expect(wrapper.text()).to.equal('ButtonB');
    });

    it('should render <ButtonB /> when random number is 0 and testCohortSize is 0.4', () => {
      Math.random = () => 0;
      const wrapper = mount(
        <ABComponent
          experimentParams={{
            id: 'button-experiment',
            testCohortSize: 0.4,
          }}
          ComponentA={ButtonA}
          ComponentB={ButtonB} />
      );
      expect(wrapper.text()).to.equal('ButtonB');
    });
  });


  describe('A or B being React element', () => {
    it('should render <ButtonA /> with value of text prop when random number is 0.4 and testCohortSize is 0.4', () => {
      Math.random = () => 0.4;
      const wrapper = mount(
        <ABComponent
          experimentParams={{
            id: 'button-experiment',
            testCohortSize: 0.4,
          }}
          ComponentA={<ButtonA text="Alternate Text A" />}
          ComponentB={<ButtonB text="Alternate Text B" />} />
      );
      expect(wrapper.text()).to.equal('Alternate Text A');
    });

    it('should render <ButtonA /> with value of text prop when random number is 0.7 and testCohortSize is 0.4', () => {
      Math.random = () => 0.7;
      const wrapper = mount(
        <ABComponent
          experimentParams={{
            id: 'button-experiment',
            testCohortSize: 0.4,
          }}
          ComponentA={<ButtonA text="Alternate Text A" />}
          ComponentB={<ButtonB text="Alternate Text B" />} />
      );
      expect(wrapper.text()).to.equal('Alternate Text A');
    });

    it('should render <ButtonB /> with value of text prop when random number is 0.39 and testCohortSize is 0.4', () => {
      Math.random = () => 0.39;
      const wrapper = mount(
        <ABComponent
          experimentParams={{
            id: 'button-experiment',
            testCohortSize: 0.4,
          }}
          ComponentA={<ButtonA text="Alternate Text A" />}
          ComponentB={<ButtonB text="Alternate Text B" />} />
      );
      expect(wrapper.text()).to.equal('Alternate Text B');
    });

    it('should render <ButtonB /> with value of text prop when random number is 0 and testCohortSize is 0.4', () => {
      Math.random = () => 0;
      const wrapper = mount(
        <ABComponent
          experimentParams={{
            id: 'button-experiment',
            testCohortSize: 0.4,
          }}
          ComponentA={<ButtonA text="Alternate Text A" />}
          ComponentB={<ButtonB text="Alternate Text B" />} />
      );
      expect(wrapper.text()).to.equal('Alternate Text B');
    });
  });

  describe('Success action', () => {
    it('should call success action when <ButtonB /> is rendered', () => {
      const successAction = spy();
      Math.random = () => 0;
      const wrapper = mount(
        <ABComponent
          experimentParams={{
            id: 'button-experiment',
            testCohortSize: 0.4,
          }}
          ComponentA={<ButtonA text="Alternate Text A" />}
          ComponentB={<ButtonB text="Alternate Text B" />}
          successAction={successAction} />
      );
      expect(wrapper.text()).to.equal('Alternate Text B');
      wrapper.simulate('click');
      expect(successAction.calledOnce).to.equal(true);
    });

    it('should call success action when <ButtonA /> is rendered', () => {
      const successAction = spy();
      Math.random = () => 0.45;
      const wrapper = mount(
        <ABComponent
          experimentParams={{
            id: 'button-experiment',
            testCohortSize: 0.4,
          }}
          ComponentA={<ButtonA text="Alternate Text A" />}
          ComponentB={<ButtonB text="Alternate Text B" />}
          successAction={successAction} />
      );
      expect(wrapper.text()).to.equal('Alternate Text A');
      wrapper.simulate('click');
      expect(successAction.calledOnce).to.equal(true);
    });
  });
});
