import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart=()=>{
  return{
    type:actionTypes.AUTH_START  
  }  
}

export const authSuccess=(token,id)=>{
  return{
    type:actionTypes.AUTH_SUCCESS,
    idToken:token,
    userId:id
  }
}
export const authFail=(error)=>{
  return{
    type:actionTypes.AUTH_FAIL,
    error     
  }
}
export const logout=()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return{
    type:actionTypes.AUTH_LOGOUT
  }
}
export const checkAuthTimeOut=(expirationTime)=>{
  //console.log(expirationTime);
  return dispatch=>{
    setTimeout(()=>{
      dispatch(logout());
    },expirationTime*1000);
  }
}
export const auth=(email,password,isSignUp)=>{
  return dispatch=>{
     dispatch(authStart());
     const authData={
       email:email,
       password:password,
       returnSecureToken:true  
     }
     let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA24ztCtk91aj-8z3lTvudDfx1UjjSjQ2s';
     if(!isSignUp){
       url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA24ztCtk91aj-8z3lTvudDfx1UjjSjQ2s';
     }
     axios.post(url,authData)  
     .then(response=>{
       //console.log(response); 
       let expirationDate=new Date(new Date().getTime() + response.data.expiresIn*1000);
       localStorage.setItem('token',response.data.idToken);
       localStorage.setItem('expirationDate',expirationDate); 
       localStorage.setItem('userId',response.data.localId);
       dispatch(authSuccess(response.data.idToken,response.data.localId));
       dispatch(checkAuthTimeOut(response.data.expiresIn));
     })
     .catch(error=>{
       //console.log(error);
       dispatch(authFail(error.response.data.error));   
     })

  }  
}
export const authRedirectPath=(path)=>{
  return {
     type:actionTypes.SET_AUTH_REDIRECT_PATH,
     path 
  }
}
export const authCheckState=()=>{
  return dispatch=>{
    const token=localStorage.getItem('token');
    if(!token){
      dispatch(logout());
    }else{
      const expirationDate=new Date(localStorage.getItem('expirationDate'));
      if(expirationDate > new Date()){
        const userId=localStorage.getItem('userId');
        dispatch(authSuccess(token,userId));
        dispatch(checkAuthTimeOut((expirationDate.getTime()- new Date().getTime())/1000))
      }else{
        dispatch(logout()); 
      }
    } 
  }
}