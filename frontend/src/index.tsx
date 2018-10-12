import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Routes from './Routes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Routes />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
