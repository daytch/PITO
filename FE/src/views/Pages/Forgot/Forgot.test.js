import React from 'react';
import ReactDOM from 'react-dom';
import Forgot from './Forgot';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Forgot />, div);
  ReactDOM.unmountComponentAtNode(div);
});
