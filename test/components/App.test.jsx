// Passing arrow functions (lambdas) to Mocha is discouraged
// https://mochajs.org/#arrow-functions
// eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always']
// global describe, it, beforeEach, before

import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import { App } from '../../src/components/App';
import AuthContainer from '../../src/containers/AuthContainer';

describe('App', () => {
  it('should render without crashing', function() {
    shallow(<App />);
  });

  it('should have a div as container', function() {
    const wrapper = shallow(<App />);
    assert.strictEqual(wrapper.type(), 'div');
  });

  it('should render AuthContainer', () => {
    const wrapper = shallow(<App />);
    assert.strictEqual(wrapper.contains(<AuthContainer />), true);
  });
});
