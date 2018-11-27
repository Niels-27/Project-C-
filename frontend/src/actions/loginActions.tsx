import ApiCall from '../logic/apiCall';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';
// import axios from 'axios';

// export function LoginRequest(userData:object) {   
//     return dispatch => {
//         return userData;
//     }
// }
export function setCurrentUser(user) {
    return {
      type: SET_CURRENT_USER,
      user
    };
  }
export function logout() {
    return dispatch => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(setCurrentUser({}));
    }
  }
  
  export function Login(data) {
    return dispatch => {

      const call: ApiCall = new ApiCall();
      call.setURL("authenticate");
      return call.result(data).then(res => {
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
      });
    }
  }
export function UserExists(email:string, password:string) {
    return dispatch => {
      return CheckUser(email, password);
    }
  }
async function CheckUser(e, p) {
    const call: ApiCall = new ApiCall();
    call.setURL("testuser", e, p);
    return call.result(); // hpoi
}

