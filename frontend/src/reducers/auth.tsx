import { SET_CURRENT_USER } from '../actions/types';
// import * as isEmpty from 'lodash';
// import { object } from 'prop-types';

const initialState = {
  isAuthenticated: false,
  user: {},
  userData: {}
};

export default (state = initialState, action)=> {
  switch(action.type) {
    case SET_CURRENT_USER:   
      return {
        isAuthenticated: !checkObjectEmpty(action.user),
        user: action.user,
        userData: action.userData
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