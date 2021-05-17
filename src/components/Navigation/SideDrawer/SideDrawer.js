import React from 'react';
import Logo from '../../Logo/Logo'; 
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/auxiliary';
const sideDrawer = props =>{
  let attachedClasses=[classes.SideDrawer,classes.Open];
  if(!props.open){
    attachedClasses=[classes.SideDrawer,classes.Close];
  } 
  return(
   <Aux> 
    <Backdrop show={props.open} closed={props.clicked}/> 
     <div className={attachedClasses.join(' ')} onClick={props.clicked}>
      <div className={classes.Logo}> 
       <Logo/>
      </div>
    <nav>
      <NavigationItems isAuthenticated={props.isAuthenticated}/>   
    </nav>
    </div>
   </Aux>    
 );
}
export default sideDrawer
 