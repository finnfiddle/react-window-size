/* eslint-disable prefer-arrow-callback, react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import windowSize from '../index';

const ScreenSize = (props) => (
  <p>
    Screen width is: {props.windowWidth}
    <br />
    Screen height is: {props.windowHeight}
  </p>
);

describe('windowSize', () => {

  it('should have a display name with the name of the composed component', () => {
    const EnhancedComponent = windowSize(ScreenSize);
    const wrapper = shallow(<div><EnhancedComponent /></div>);
    assert.equal(wrapper.children().at(0).name(), `windowSize(${ScreenSize.name})`);
  });

  it('should have a display name with the display name of the composed component if given', () => {
    ScreenSize.displayName = 'p';
    try {
      const EnhancedComponent = windowSize(ScreenSize);
      const wrapper = shallow(<div><EnhancedComponent /></div>);
      assert.equal(wrapper.children().at(0).name(), `windowSize(${ScreenSize.displayName})`);
    }
    finally {
      delete ScreenSize.displayName;
    }
  });

});
