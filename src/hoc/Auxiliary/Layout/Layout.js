import React, { Component } from 'react';
import Aux from '../auxiliary'
import {connect} from 'react-redux';
import SideDrawer from '../../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
class layout extends Component{
 state={
  showSideDrawer:false
 }
 sideDrawerToggleHandler=()=>{
   this.setState({showSideDrawer:true});
    //   this.setState((prevState)=>{
//       return {showSideDrawer:!prevState.showSideDrawer}
//     })
 } 
 sideDrawerClosedHandler=()=>{
  this.setState({showSideDrawer:false})
 } 
 render(){
   return(
   <Aux>
    <Toolbar 
     clicked={this.sideDrawerToggleHandler}
     isAuthenticated={this.props.isAuth}
     />
    <SideDrawer 
      open={this.state.showSideDrawer} 
      clicked={this.sideDrawerClosedHandler}
      isAuthenticated={this.props.isAuth}
    />
    <main className={classes.Content}>
     {this.props.children}   
    </main> 
   </Aux>
  );   
 }
   
};
const mapStateToProps=state=>{
  return{
    isAuth:state.auth.token!==null
  }
  
}
export default connect(mapStateToProps)(layout);