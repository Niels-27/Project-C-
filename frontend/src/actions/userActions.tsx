import ApiCall from '../logic/apiCall';

export function RetrieveUserData(user: object) {   
    return dispatch => {
        return GetUserData(user) ;
    }
}
async function GetUserData(user) {   
   const call : ApiCall = new ApiCall();
   call.setURL("userdata");
   return call.result(user); // hpoi     
}

