import { SET_CURRENT_USER } from '../actions/types';
import * as isEmpty from 'lodash';

const initialState = {
  isAuthenticated: false,
  user: {}
};

 interface IAction{
   type,
   user,

}
export default (state = initialState, action:IAction )=> {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default: return state;
  }
}