import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Routes from './Routes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Routes />, div);
  ReactDOM.unmountComponentAtNode(div);
});
