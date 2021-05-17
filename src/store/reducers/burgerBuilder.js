import * as actionTypes from '../actions/actionTypes';
const initialState={
    ingredients:null,
    totalPrice:4,
    purchasable:false,
    error:false,
    building:false
  }
const INGREDIENT_PRICES={
  salad:0.5,
  bacon:0.9,
  meat:0.7,
  cheese:0.6
}
const reducer=(state=initialState,action)=>{
  switch(action.type){
    case actionTypes.ADD_INGREDIENTS:
      return{
        ...state,
        ingredients:{
          ...state.ingredients,
          [action.ingredientName]:state.ingredients[action.ingredientName]+1,
        },
        totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        purchasable:true,
        building:true
      };   
    case actionTypes.REMOVE_INGREDIENTS:
        const sum=Object.keys(state.ingredients)
        .map(igKey=>{
          return state.ingredients[igKey]; 
        }).reduce((sum,el)=>{
          return sum+el;
        })
        return{
            ...state,
            ingredients:{
              ...state.ingredients,
              [action.ingredientName]:state.ingredients[action.ingredientName]-1,
            },
            totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            purchasable:sum>0,
            building:true
        };
    case actionTypes.SET_INGREDIENTS:
        return{
          ...state,
          ingredients:{
            salad:action.ingredients.salad,
            cheese:action.ingredients.cheese,
            bacon:action.ingredients.bacon,
            meat:action.ingredients.meat,
          },
          error:false,
          totalPrice:4,
          building:false
        } 
    case actionTypes.FETCH_INGREDIENTS_FAILED:
        return{
          ...state,
          error:true
        }    
    default:
      return state;  
  }
}
export default reducer;