import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess=(id,orderDetails)=>{
  return{
    type:actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId:id,
    orderDetails  
  }  
}
export const purchaseBurgerFail=(error)=>{
  return{
    type:actionTypes.PURCHASE_BURGER_FAIL,
    err:error   
  }  
}
export const purchaseBurgerStart=()=>{
  return{
    type:actionTypes.PURCHASE_BURGER_START  
  }  
}
export const purchaseInit=()=>{
  return{
    type:actionTypes.PURCHASE_INIT  
  }  
}
export const purchaseBurger=(orderData,token)=>{
   return dispatch=>{
    dispatch(purchaseBurgerStart());   
    axios.post('/orders.json?auth='+token,orderData)
    .then(response=>{
       //console.log(response.data.name); 
       dispatch(purchaseBurgerSuccess(response.data.name,orderData));  
    })
    .catch(error=>{
       dispatch(purchaseBurgerFail(error));
    }) 
   } 
}
export const fetchOrdersStart=()=>{
   return{
     type:actionTypes.FETCH_ORDERS_START
   }
}
export const fetchOrdersSucces=(orders)=>{
   return{
     type:actionTypes.FETCH_ORDERS_SUCCESS,
     orders
   }   
}
export const fetchOrdersFail=()=>{
   return{
     type:actionTypes.FETCH_ORDERS_FAIL
   }
}
export const fetchOrders=(token,userId)=>{
   return dispatch=>{ 
    dispatch(fetchOrdersStart());
    const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'; 
    axios.get('/orders.json'+queryParams)
    .then(res=>{
      const fetchedOrders=[];  
      for(let key in res.data){
        fetchedOrders.push({
            ...res.data[key],
            id:key 
           });
      }
      console.log(fetchedOrders);  
      dispatch(fetchOrdersSucces(fetchedOrders)); 
    })
    .catch(e=>{
      dispatch(fetchOrdersFail());
    })
   }
}