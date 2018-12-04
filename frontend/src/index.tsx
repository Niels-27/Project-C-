import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { setCurrentUser } from './actions/loginActions';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';

import thunk from 'redux-thunk';
 /* eslint-disable no-underscore-dangle */
 /* eslint-disable no-object-litteral */

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window['devToolsExtension'] ? window['devToolsExtension']() : f => f
  )
);
if(localStorage.jwtToken === 'undefined'){
  localStorage.removeItem('jwtToken');  
}
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
