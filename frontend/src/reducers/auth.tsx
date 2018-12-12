import { SET_CURRENT_USER } from '../actions/types';
// import * as isEmpty from 'lodash';
// import { object } from 'prop-types';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action)=> {
  switch(action.type) {
    case SET_CURRENT_USER:   
      return {
        isAuthenticated: !checkObjectEmpty(action.user),
        user: action.user,
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