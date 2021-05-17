import React,{ Component } from "react";
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component{
  componentDidMount(){
    this.props.onfetchOrders(this.props.token,this.props.userId);
  }
  render(){
   let orders=<Spinner/>;
   if(!this.props.loading){
     if(!this.props.orders){
       orders=null;
      }
     else{
      orders=this.props.orders.map(order=>(
        <Order 
          key={order.id} 
          ingredients={order.ingredients}
          price={order.price}        
        /> 
      ))  
     }
     
   } 
   return( 
    <div>
     {orders} 
    </div>
   );
 }
}
const mapStateToProps=(state)=>{
  return{
    orders:state.order.orders,
    loading:state.order.loading,
    token:state.auth.token,
    userId:state.auth.userId
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onfetchOrders:(token,userId)=>dispatch(actions.fetchOrders(token,userId))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));