import * as React from 'react';
import * as renderer from 'react-test-renderer';
import App from '../App';
import 'react-native';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  const tree = renderer.create(<App />);
});
