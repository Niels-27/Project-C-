import ApiCall from '../logic/apiCall';

export function SignUpRequest(userData:object) {   
    return dispatch => {
        return PostData(userData);
    }
}

async function PostData(userData) {
    const call: ApiCall = new ApiCall();
    call.setURL("testuser");
    return call.result(userData); // hpoi
}