import ApiCall from '../logic/apiCall';

export function SignUpRequest(userData:object) {   
    return dispatch => {
        return PostUser(userData);
    }
}
async function PostUser(userData) {
    const call: ApiCall = new ApiCall();
    call.setURL("testuser");
    return call.result(userData); // hpoi
}

export function IsEmailExists(email:string) {
    return dispatch => {
      return CheckEmail(email);
    }
  }
  async function CheckEmail(email) {
    const call: ApiCall = new ApiCall();
    call.setURL("testuser", email);
    return call.result(); // hpoi
}