import React,{ Component } from "react";
import Aux from '../../hoc/Auxiliary/auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component{
  state={ 
    purchasing:false,
    loading:false,
  }
  componentDidMount(){
   this.props.onInitIngredient();      
  } 
  purchaseHandler=()=>{
    if(this.props.isAuthenticated){
      this.setState({purchasing:true});
    }
    else{
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }    
  }
  purchaseCancelHandler=()=>{
    this.setState({purchasing:false}); 
  }
  purchaseContinueHandler=()=>{
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }
  render(){
    const disabledInfo={
      ...this.props.ings
    }
    for(let key in disabledInfo){
      disabledInfo[key]=disabledInfo[key]<=0;
    }
    let orderSummmary=null;
    let burger=this.props.error? <p>Ingredients can't be loaded!</p>:<Spinner/>;
    if(this.props.ings){
      burger=(
        <Aux>
         <Burger ingredients={this.props.ings}/>
         <BuildControls 
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved} 
          disabled={disabledInfo}
          price={this.props.totalPrice}
          purchasable={this.props.purchasable}
          ordered={this.purchaseHandler}
          isAuth={this.props.isAuthenticated}
         />
        </Aux>
        );
      orderSummmary=<OrderSummary 
        price={this.props.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        ingredients={this.props.ings}/>
    }
    return( 
    <Aux>
      <Modal show={this.state.purchasing} closeBackdrop={this.purchaseCancelHandler}>
        {orderSummmary}
      </Modal>
      {burger}
    </Aux>    
   );
 }
}
const matchStateToProps=state=>{
  return{
    ings:state.burgerBuilder.ingredients,
    totalPrice:state.burgerBuilder.totalPrice,
    purchasable:state.burgerBuilder.purchasable,
    error:state.burgerBuilder.error,
    isAuthenticated:state.auth.token!==null
  }
}
const matchDispatchToProps=dispatch=>{
  return{
    onIngredientAdded:(ingName)=>dispatch(burgerBuilderActions.addIngredients(ingName)),
    onIngredientRemoved:(ingName)=>dispatch(burgerBuilderActions.addIngredients(ingName)),
    onInitIngredient:()=>dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase:()=>dispatch(burgerBuilderActions.purchaseInit()),
    onSetAuthRedirectPath:(path)=>dispatch(burgerBuilderActions.authRedirectPath(path))
  } 
}
export default connect(matchStateToProps,matchDispatchToProps)((WithErrorHandler(BurgerBuilder,axios)));