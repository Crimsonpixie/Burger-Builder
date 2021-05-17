import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from '../../shared/utility';

const initialState={
   token:null,
   userId:null,
   loading:false,
   error:null,
   authRedirectPath:'/'
}
const authStart=(state,action)=>{
  return updatedObject(state,{loading:true,error:null});  
}
const authSuccess=(state,action)=>{
  return updatedObject(state,{
    loading:false,
    token:action.idToken,
    userId:action.userId,
    error:null
  })
}
const authFail=(state,action)=>{
  return updatedObject(state,{
    loading:false,
    error:action.error  
  })  
}  
const authLogout=(state)=>{
  return updatedObject(state,{token:null,userId:null});
}
const authRedirectPath=(state,action)=>{
  return updatedObject(state,{authRedirectPath:action.path});  
}
const reducer=(state=initialState,action)=>{
   switch(action.type){
    case actionTypes.AUTH_START:return authStart(state,action);
    case actionTypes.AUTH_SUCCESS:return authSuccess(state,action);
    case actionTypes.AUTH_FAIL:return authFail(state,action);
    case actionTypes.AUTH_LOGOUT:return authLogout(state);
    case actionTypes.SET_AUTH_REDIRECT_PATH:return authRedirectPath(state,action);
    default:return state;
   }  
}
export default reducer;