import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { ButtonA, ButtonB, ButtonC } from './fixture';
import { ABComponent } from '../src';

describe('<ABComponent />', () => {
  beforeEach(() => {
    global.localStorage.clear();
  });

  const mountButton = () => {
    return mount(
      <ABComponent
          experimentId="button-experiment"
          variants={[
            { component: ButtonA, occurrence: 0.4 },
            { component: ButtonB, occurrence: 0.3 },
            { component: ButtonC, occurrence: 0.3 },
          ]} />
    );
  };

  it('should render <ButtonA />', () => {
    // Mock Math.random() to give the desired value for testing.
    Math.random = () => 0;
    expect(mountButton().contains(<div>ButtonA</div>)).to.equal(true);
  });

  it('should render <ButtonA />', () => {
    Math.random = () => 0.312;
    expect(mountButton().contains(<div>ButtonA</div>)).to.equal(true);
  });

  it('should render <ButtonB />', () => {
    Math.random = () => 0.4;
    expect(mountButton().contains(<div>ButtonB</div>)).to.equal(true);
  });

  it('should render <ButtonB />', () => {
    Math.random = () => 0.58;
    expect(mountButton().contains(<div>ButtonB</div>)).to.equal(true);
  });

  it('should render <ButtonC />', () => {
    Math.random = () => 0.7;
    expect(mountButton().contains(<div>ButtonC</div>)).to.equal(true);
  });

  it('should render <ButtonC />', () => {
    Math.random = () => 0.89;
    expect(mountButton().contains(<div>ButtonC</div>)).to.equal(true);
  });
});
