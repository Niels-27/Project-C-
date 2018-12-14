import ApiCall from '../logic/apiCall';

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
