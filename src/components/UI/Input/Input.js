import React from 'react'
import classes from './Input.module.css';
const Input = props => {
  // console.log(props);
  let inputElement=null;
  const inputClasses=[classes.InputElement];
  if(props.inValid && props.shouldValidate && props.touched){
    inputClasses.push(classes.Invalid);
  }
  switch(props.elementType){
   case('input'):
     inputElement=<input 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                     />;
     break;
   case('textarea'):
     inputElement=<textarea 
                     className={inputClasses.join(' ')} 
                     {...props.elementConfig}
                     value={props.value}
                     onChange={props.changed}
                      />;
     break;
   case('select'):
     inputElement=(
                  <select 
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed} 
                    >
                    {props.elementConfig.options.map(op=>(
                      <option 
                        key={op.value} 
                        value={op.value}>{op.displayValue}</option>  
                    ))}
                  </select> 
     ) 
     break;

   default:
     inputElement=<input className={inputClasses.join(' ')} {...props}/>;
     break;   
  }
  return (
    <div className={classes.Input}>
     <label className={classes.Label}>{props.label}</label>   
     {inputElement} 
    </div>    
  );
}
export default Input;
 