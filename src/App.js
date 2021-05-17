import React,{ Component } from 'react';
import Layout from './hoc/Auxiliary/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {Route, Switch,withRouter,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/auth';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asynCheckout=asyncComponent(()=>{
  return import('./containers/Checkout/Checkout')
})
const asynOrders=asyncComponent(()=>{
  return import('./containers/Orders/Orders')
})
const asycAuth=asyncComponent(()=>{
  return import('./containers/Auth/Auth')
})
class App extends Component{ 
 
 componentDidMount(){
   this.props.onTryAutoSignIn();
 } 
 render(){ 
  let routes=(
    <Switch>
      <Route path="/auth" component={asycAuth}/>
      <Route path="/" exact component={BurgerBuilder}/>
      <Redirect to="/"/>
    </Switch>
  ); 
  if(this.props.isAuthenticated){
   routes=(
    <Switch>
       <Route path="/checkout" component={asynCheckout}/>
       <Route path="/orders" component={asynOrders}/>     
       <Route path="/logout" component={Logout}/>  
       <Route path="/auth" component={asycAuth}/> 
       <Route path="/" exact component={BurgerBuilder}/> 
       <Redirect to="/"/>
    </Switch>
   );  
  }
  return (
    <div>
     <Layout>
       {routes}
     </Layout> 
    </div>
  );
 }
}
const matchStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token!==null
  }
}
const matchDispatchToProps=dispatch=>{
  return{
    onTryAutoSignIn:()=>dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(matchStateToProps,matchDispatchToProps)(App));
