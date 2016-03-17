import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { DummyComponent } from '../src';

describe('<DummyComponent />', () => {
  it('renders <div>', () => {
    const wrapper = shallow(<DummyComponent />);
    expect(wrapper.type()).to.eql('div');
  });
});
