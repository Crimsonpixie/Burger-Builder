import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {updatedObject,checkValidity} from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp:true
    }
    componentDidMount(){
      if(!this.props.building && this.props.authRedirectPath!=='/'){ //Second condition is avoided to avoid unnecessary calling 
                                                                     //of onSetAuthRedirect() when we first click on Authenticate because 
                                                                     //initial state of authRedirectPath is '/' and we do not need to set 
                                                                     //it to '/' another time by calling onSetAuthRedirect()  
        this.props.onSetAuthRedirect();  
      }
    }
    

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updatedObject(this.state.controls,{
           [controlName]:updatedObject(this.state.controls[controlName],{
                value: event.target.value,
                valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true 
           }) 
        })
        this.setState({controls: updatedControls});
    }
     
    submitHandler=(event)=>{
      event.preventDefault();
      this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }
    switchToAuthModeHandler=(event)=>{
      event.preventDefault();
      this.setState(prevState=>{
         return {isSignUp:!prevState.isSignUp}; 
      })    
    }
    render () {
        let authRedirect=null;
        if(this.props.isAuthenticated){
          authRedirect=<Redirect to={this.props.authRedirectPath}/>;  
        }
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                inValid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );
        
        if(this.props.loading){
           form=<Spinner/>   
        }
        let errorMessage=null;
        if(this.props.error){
          errorMessage=<p>{this.props.error.message}</p>  
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                      clicked={(event)=>this.switchToAuthModeHandler(event)} 
                      btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN': 'SIGNUP'}</Button>
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token!==null, 
        building:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath 
    }   
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password,isSignUp) => dispatch(actions.auth(email, password,isSignUp)),
        onSetAuthRedirect:()=>dispatch(actions.authRedirectPath('/'))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);