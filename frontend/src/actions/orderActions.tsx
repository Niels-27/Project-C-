import ApiCall from '../logic/apiCall';
import { SET_PENDING_ORDER } from './types';

export function PostOrder(order: object) {   
    return dispatch => {
        return PostOrderData(order) ;
    }
}
async function PostOrderData(orderData: object) {   
   const call : ApiCall = new ApiCall();
   call.setURL("postorder");
   return call.result(orderData); // hpoi     
}

export function setPending(cookie: object) {   
    return dispatch => {
        dispatch(setPendingOrder(cookie));       
    }
}

export function setPendingOrder(cookie: object) {
    return {
      type: SET_PENDING_ORDER,
      cookie,
    };
  }
