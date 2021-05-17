import React,{ Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route,Redirect} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component{
  checkoutCancelHandler=()=>{
    this.props.history.goBack();  
  }
  checkoutContinueHandler=()=>{
    this.props.history.push(this.props.match.path+'/contact-data');  
  }
  render(){
   //console.log('Render'); 
   let summary=<Redirect to="/"/>
   if(this.props.ings){
     let purchaseRedirect=this.props.purchased ? <Redirect to="/"/>:null;
     summary=(
      <div>
        {purchaseRedirect}
        <CheckoutSummary 
         checkoutContinueHandler={this.checkoutContinueHandler}
         checkoutCancelHandler={this.checkoutCancelHandler}
         ingredients={this.props.ings}/>
         <Route path={this.props.match.path+'/contact-data'} 
                component={ContactData}  
          />
      </div> 
    );
   } 
   return summary;
 }
}
const matchStateToProps=state=>{
  return{
    ings:state.burgerBuilder.ingredients,
    purchased:state.order.purchased 
  } 
}
export default connect(matchStateToProps)(Checkout); 