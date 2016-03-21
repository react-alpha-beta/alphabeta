import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

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
      expect(wrapper.contains(<div>ButtonA</div>)).to.equal(true);
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
      expect(wrapper.contains(<div>ButtonA</div>)).to.equal(true);
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
      expect(wrapper.contains(<div>ButtonB</div>)).to.equal(true);
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
      expect(wrapper.contains(<div>ButtonB</div>)).to.equal(true);
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
          ComponentB={<ButtonA text="Alternate Text B" />} />
      );
      expect(wrapper.contains(<div>Alternate Text A</div>)).to.equal(true);
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
          ComponentB={<ButtonA text="Alternate Text B" />} />
      );
      expect(wrapper.contains(<div>Alternate Text A</div>)).to.equal(true);
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
          ComponentB={<ButtonA text="Alternate Text B" />} />
      );
      expect(wrapper.contains(<div>Alternate Text B</div>)).to.equal(true);
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
          ComponentB={<ButtonA text="Alternate Text B" />} />
      );
      expect(wrapper.contains(<div>Alternate Text B</div>)).to.equal(true);
    });
  });
});
