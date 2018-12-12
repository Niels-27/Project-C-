import ApiCall from '../logic/apiCall';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
    return {
      type: SET_CURRENT_USER,
      user
    };
  }
  export function Login(data) {
    return dispatch => {

      const call: ApiCall = new ApiCall();
      call.setURL("authenticate");
      console.log("last finish");
      const res = call.result(data).then(response => {
        const token = response.token;
        const user = response.id;
        console.log(user);
        console.log(token);
        localStorage.setItem('jwtToken', token);
        if (token !== "undefined") {
          // Set auth token header auth
          setAuthorizationToken(token);      
          dispatch(setCurrentUser(jwtDecode(token)));
          // Decode token and get user info and exp   
        }         
        return response;
      }, (error) => error );
      return res;  
    }
  }
export function Logout() {
    return dispatch => {
      localStorage.removeItem('jwtToken');  
      setAuthorizationToken(false);
      dispatch(setCurrentUser({}));
    }
  }
export function UserExists(user: object) {
    return dispatch => {
      return CheckUser(user);
    }
  }
async function CheckUser(user) {
    const call: ApiCall = new ApiCall();
    call.setURL("checkuser");
    return call.result(user); // hpoi
}

