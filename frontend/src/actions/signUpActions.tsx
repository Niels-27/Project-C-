import ApiCall from '../logic/apiCall';

export function SignUpRequest(userData:any) {   
    return dispatch => {
        return PostUser(userData);
    }
}
async function PostUser(userData: any) {
    const call: ApiCall = new ApiCall();
    call.setURL("register");
    return call.result(userData); // hpoi
}

export function IsEmailExists(userData:any) {
    return dispatch => {
      return CheckEmail(userData);
    }
  }
  async function CheckEmail(userData:any) {
    const call: ApiCall = new ApiCall();
    call.setURL("checkemail");
    return call.result(userData); // hpoi
}

export function SignUpGuest(userData:any) {   
    return dispatch => {
        return PostGuest(userData);
    }
}
async function PostGuest(userData: any) {
    const call: ApiCall = new ApiCall();
    call.setURL("registerGuest");
    return call.result(userData); // hpoi
}
