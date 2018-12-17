
import { SET_PENDING_ORDER } from '../actions/types';
// import * as isEmpty from 'lodash';

const initialState = {
  isPending: false,
  cookie: {},
};

export default (state = initialState, action)=> {
  switch(action.type) {
    case SET_PENDING_ORDER:
      return {
        isPending: checkObjectEmpty(action.cookie),
        cookie: action.cookie,
      };
    default: return state;
  }
}

 function checkObjectEmpty(obj) {
  for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
          return false;
      }
  }
  return true;
}