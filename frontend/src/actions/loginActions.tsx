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
      console.log("last finish");
      const res =  call.result(data).then(response => {
        const token = response.token;
        console.log(response.name);
        console.log(token);
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
        return response;
      }, (error) => error );
      return res;  
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

