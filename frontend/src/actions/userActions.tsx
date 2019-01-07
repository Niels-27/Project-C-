import ApiCall from '../logic/apiCall';

export function RetrieveData(userData: object, origin: string) {   
    return dispatch => {
        return GetData(userData, origin) ;
    }
}
async function GetData(userData, origin) {   
   const call : ApiCall = new ApiCall();
   call.setURL(origin);
   return call.result(userData); // hpoi     
}

export function ChangeData(userData: object, origin: string) {   
    return dispatch => {
        return Update(userData, origin) ;
    }
}
async function Update(userData, origin) {   
    const call : ApiCall = new ApiCall();
    call.setURL("updateUser", origin);
    return call.result(userData); // hpoi     
 }
 export function PostAddress(address: object, origin: string) {   
    return dispatch => {
        return HandlePost(address, origin) ;
    }
}
async function HandlePost(address, origin) {   
   const call : ApiCall = new ApiCall();
   call.setURL(origin);
   return call.result(address); // hpoi     
}



