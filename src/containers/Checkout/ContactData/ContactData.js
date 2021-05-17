import React,{ Component } from "react";
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';
import {updatedObject,checkValidity} from '../../../shared/utility';
class ContactData extends Component{
 state={
   orderForm:{
     name:{
       elementType:'input',
       elementConfig:{
         type:'text',
         placeholder:'Your Name',
         label:'NAME'
       },
       value:'',
       valdation:{
         required:true
       },
       valid:false,
       touch:false
     }, 
     street:{
       elementType:'input',
       elementConfig:{
         type:'text',
         placeholder:'Street',
         label:'STREET'
       },
       value:'',
       valdation:{
        required:true
       },
       valid:false,
       touch:false   
     },
     zipCode:{
       elementType:'input',
       elementConfig:{
         type:'text',
         placeholder:'ZIP Code',
         label:'ZIP CODE'
       },
       value:'',
       valdation:{
        required:true,
        minLength:5,
        maxLength:6,
        isNumeric:true
       },
       valid:false,
       touch:false   
     },
     country:{
      elementType:'input',
      elementConfig:{
        type:'text',
        placeholder:'Country',
        label:'COUNTRY'
      },
      value:'',
      valdation:{
        required:true
      },
      valid:false,
      touch:false   
    },
     email:{
      elementType:'input',
      elementConfig:{
        type:'email',
        placeholder:'Your E-Mail',
        label:'E-MAIL'
      },
      value:'',
      valdation:{
        required:true,
        isEmail:true
      },
      valid:false,
      touch:false   
    },
    deliveryMethod:{
      elementType:'select',
      elementConfig:{
        options:[
           {value:'fastest',displayValue:'Fastest'},
           {value:'cheapest',displayValue:'Cheapest'}
           ],
           label:'DELIVERY METHOD'
      },
      value:'fastest',
      valdation:{},
      valid:true   
    }
  },
  formisValid:false
}
 componentDidMount(){
  console.log('[Mount] ContactData.js');  
  console.log(this.props); 
 }
 ChangeHandler=(event,inputIdentifier)=>{
   const updatedFormElement=updatedObject(this.state.orderForm[inputIdentifier],{
      value:event.target.value,
      valid:checkValidity(event.target.value,this.state.orderForm[inputIdentifier].valdation),
      touch:true       
   })
   const updatedOrderForm=updatedObject(this.state.orderForm,{
    [inputIdentifier]:updatedFormElement
   })
   let formisValid=true;
   for(let inputIdentifiers in updatedOrderForm){
     formisValid=updatedOrderForm[inputIdentifiers].valid && formisValid;
   }
   this.setState({orderForm:updatedOrderForm,formisValid:formisValid});
 }
 orderHandler=(event)=>{
    event.preventDefault();
    const formData={};
    for(let formInputIdentifier in this.state.orderForm){
      formData[formInputIdentifier]=this.state.orderForm[formInputIdentifier].value;
    }
    const order={
      ingredients:this.props.ings,
      price:Number.parseFloat(this.props.price).toFixed(2),
      orderData:formData,
      userId:this.props.userId
    }
    this.props.onOrderBurger(order,this.props.token);   
 }   
 render(){
  let formElementArray=[];
  for(let key in this.state.orderForm){
    formElementArray.push({
       id:key,
       config:this.state.orderForm[key]
    })   
  }
  let form=(
    <form onSubmit={this.orderHandler}>
       {formElementArray.map(formElement=>(
         <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            label={formElement.config.elementConfig.label}
            inValid={!formElement.config.valid}
            shouldValidate={formElement.config.valdation}
            touched={formElement.config.touch}
            changed={(event)=>this.ChangeHandler(event,formElement.id)} 
            />

       ))}
       <Button btnType="Success" disabled={!this.state.formisValid}>ORDER</Button>
     </form>
    );   
  if(this.props.loading){
    form=<Spinner/>;   
  }   
  return(
   <div className={classes.ContactData}>
     <h4>Enter your Contact Data</h4>  
     {form}
   </div>
  );
 }
}
const matchStateToProps=state=>{
  return{
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    loading:state.order.loading,
    token:state.auth.token,
    userId:state.auth.userId
  }
}
const matchDispatchToProps=dispatch=>{
  return{
    onOrderBurger:(orderData,token)=>dispatch(orderActions.purchaseBurger(orderData,token)) 
  } 
}
export default connect(matchStateToProps,matchDispatchToProps)(withErrorHandler(ContactData,axios));