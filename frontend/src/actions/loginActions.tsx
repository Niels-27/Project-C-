import ApiCall from '../logic/apiCall';

export function LoginRequest(userData:object) {   
    return dispatch => {
        return userData;
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