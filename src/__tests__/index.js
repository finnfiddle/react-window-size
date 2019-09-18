/* eslint-disable prefer-arrow-callback, react/prop-types */
// eslint-disable-next-line no-unused-vars
const jsdom = require('jsdom').jsdom;
const exposedProperties = ['window', 'navigator', 'document'];
global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});
global.navigator = {
  userAgent: 'node.js',
};
document.body.clientHeight = 768;
document.body.clientWidth = 1024;

// documentRef = document;

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { assert } from 'chai';
import windowSize from '../index';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const ScreenSize = (props) => (
  <div>{`===${props.windowWidth}===${props.windowHeight}===`}</div>
);

describe('windowSize', () => {

  it('should have a display name with the name of the composed component', () => {
    const EnhancedComponent = windowSize(ScreenSize);
    const wrapper = mount(<div><EnhancedComponent /></div>);
    assert.equal(wrapper.children().at(0).name(), `ForwardRef(windowSize(${ScreenSize.name}))`);
  });

  it('should have a display name with the display name of the composed component if given', () => {
    ScreenSize.displayName = 'p';
    try {
      const EnhancedComponent = windowSize(ScreenSize);
      const wrapper = mount(<div><EnhancedComponent /></div>);
      assert.equal(wrapper.children().at(0).name(),
        `ForwardRef(windowSize(${ScreenSize.displayName}))`);
    }
    finally {
      delete ScreenSize.displayName;
    }
  });

  it('should get passed the width and height', () => {
    ScreenSize.displayName = 'p';
    try {
      const EnhancedComponent = windowSize(ScreenSize);
      const wrapper = mount(<div><EnhancedComponent /></div>);
      assert.equal(wrapper.contains(
        <div>{'===1024===768==='}</div>
      ), true);
    }
    finally {
      delete ScreenSize.displayName;
    }
  });

});
