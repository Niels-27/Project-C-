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

export function GetOrders(id:string) {   
    return dispatch => {
        return GetOrdersByID(id) ;
    }
}
async function GetOrdersByID(id: string) {   
   const call : ApiCall = new ApiCall();
   call.setURL("getOrders", id);
   return call.result(); // hpoi     
}
export function GetDelivered(id:string) {   
    return dispatch => {
        return GetDeliveredOrders(id) ;
    }
}
async function GetDeliveredOrders(id: string) {   
   const call : ApiCall = new ApiCall();
   call.setURL("getHistory", id);
   return call.result(); // hpoi     
}