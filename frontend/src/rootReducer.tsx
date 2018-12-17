import { combineReducers } from 'redux';

import auth from './reducers/auth';
import pending from './reducers/pending';

export default combineReducers({
  auth,
  pending
});