import React from 'react';
import ReactDOM from 'react-dom';
import Analytics from './Analytics';

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
  Polar: () => null,
  Pie: () => null,
  Radar: () => null,
  Bar: () => null,
  Doughnut: () => null,
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Analytics />, div);
  ReactDOM.unmountComponentAtNode(div);
});