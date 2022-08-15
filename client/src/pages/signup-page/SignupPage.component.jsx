import React, {useEffect,useState,useReducer} from "react";
import {useNavigate, Link} from 'react-router-dom';
import Loader from '../../components/shared/loader/Loader.component'
import './signup-page.styles.css';
import environments from '../../environments/environments.js';
import Card from '../../components/card/Card.component'
import FormInputContainer from "../../components/form/form-input-container/FormInputContainer.component";
import * as signupFormActions from '../../actions/signup-form-actions.js';
import signupFormReducer, {SIGNUP_FORM_INITITAL_STATE} from "../../reducers/signup-form-reducer.js";
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';


const SignUpPage = () => {
    const navigate = useNavigate();
    const [signupFormState, dispatchSignupFormState] = useReducer(signupFormReducer,SIGNUP_FORM_INITITAL_STATE);
    const [isLoading,setIsLoading] = useState(true);
    const API_URL = environments.API_URL;

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(signupFormState)
        if (
            !signupFormState.validities.firstName ||
            !signupFormState.validities.lastName ||
            !signupFormState.validities.email ||
            !signupFormState.validities.password ||
            !signupFormState.validities.rePassword ||
            signupFormState.values.firstName === '' ||
            signupFormState.values.lastName === '' ||
            signupFormState.values.email === '' ||
            signupFormState.values.password === '' ||
            signupFormState.values.rePassword === ''
        ) {
            return;
        }

        const signupFormValues = signupFormState.values;

        const data = {
        firstName: signupFormValues.firstName,
        lastName: signupFormValues.lastName,
        email: signupFormValues.email,
        password:signupFormValues.password,
    };

    try {
        const response = await fetch(`${API_URL}/users/signup`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data),
        });

        if(response.status !== 201) {
            throw new Error()
        };

        const responseData = await response.json();

        const token = responseData.data.token;

        localStorage.setItem('user-token', token);

        navigate('/users/login')
    } catch (error) {
        console.log(error)
        alert('Something went wrong!')
    }
    };

    const handleFirstNameInput = (event) => {
        const firstNameInput = event.target.value.trim();

        if (firstNameInput === '') {
            console.log('f')
            dispatchSignupFormState(
                signupFormActions.updateFirstName(firstNameInput,false,'Please Enter Your First Name')
            );
            return;
        };
        dispatchSignupFormState(signupFormActions.updateFirstName(firstNameInput, true, ''));
    };

    const handleLastNameInput = (event) => {
        const lastNameInput = event.target.value.trim();

        if (lastNameInput === '') {
            dispatchSignupFormState(
                signupFormActions.updateLastName(lastNameInput,false,'Please Enter Your Last Name')
            );
            return;
        };
        dispatchSignupFormState(signupFormActions.updateLastName(lastNameInput, true, ''));
    };

    const handleEmailInput = (event) => {
        const emailInput = event.target.value.toLowerCase().trim();
        if (emailInput === '') {
            dispatchSignupFormState(
                signupFormActions.updateEmailAction(emailInput,false,'Please Enter Your Email')
            );
            return;
        };
        if (!isEmail(emailInput)) {
            dispatchSignupFormState(
                signupFormActions.updateEmailAction(emailInput,false,'Please Enter A vaild Email Address'))
                
                return;
        };
            
        dispatchSignupFormState(signupFormActions.updateEmailAction(emailInput, true, ''));
    };

    const handlePasswordInput = (event) => {
        const passwordInput = event.target.value.trim();

        if (passwordInput === '') {
            dispatchSignupFormState(
                signupFormActions.updatePasswordAction(passwordInput,false,'Please Enter A Password')
            );
            return;
        };

        if (!(passwordInput.length > 6 && passwordInput.length < 20)) {
            dispatchSignupFormState(
                signupFormActions.updatePasswordAction(
                    passwordInput, false, "Your Password Must Contain 6 to 20 Characters")
            ); 
            return; 

        };if (!(isStrongPassword(passwordInput))) {
            dispatchSignupFormState(
                signupFormActions.updatePasswordAction(
                    passwordInput, false, "Your Password Must Contain a Capital Letter and a Sign")
            ); 
            return; 
        };

        dispatchSignupFormState(signupFormActions.updatePasswordAction(passwordInput, true, ''));
    };

    const handleRePasswordInput = (event) => {
        const rePasswordInput = event.target.value.trim();

        if (rePasswordInput === '') {
            dispatchSignupFormState(
                signupFormActions.updateRePasswordAction(rePasswordInput,false,'Please Enter Your Password Again')
            );
            return;
        };

        if (rePasswordInput !== signupFormState.values.password) {
            dispatchSignupFormState(
                signupFormActions.updateRePasswordAction(rePasswordInput,false, "Your passwords Doesn't Match")
            );
                return;
        };
        dispatchSignupFormState(signupFormActions.updateRePasswordAction(rePasswordInput, true, ''));
    };
  
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    window.scrollTo(0,0)


    return isLoading ?(
        <Loader />
    ) : (
        <main className="signup-page">
            <Card className="signup-page-card">
                <h1>Hello New Reader!</h1>
                
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <FormInputContainer
                            key = "first-name"
                            id = "first-name"
                            lableText = "First Name"
                            required = {false} 
                            isValid = {signupFormState.validities.firstName}
                            errorMsg = {signupFormState.errorMsgs.firstName}
                            handleInput = {handleFirstNameInput}
                        />
                        <FormInputContainer
                            key = "last-name" 
                            id = "last-name"
                            lableText = "Last Name"
                            required = {false} 
                            isValid = {signupFormState.validities.lastName}
                            errorMsg = {signupFormState.errorMsgs.lastName}
                            handleInput = {handleLastNameInput}
                        />
                        <FormInputContainer
                            key = "email"
                            id = "email"
                            lableText = "Email"
                            type = "mail"
                            required = {false} 
                            isValid = {signupFormState.validities.email}
                            errorMsg = {signupFormState.errorMsgs.email}
                            handleInput = {handleEmailInput}
                        />
                        <FormInputContainer
                            key = "password"
                            id = "password"
                            lableText = "Password"
                            type = "password"
                            required = {false} 
                            isValid = {signupFormState.validities.password}
                            errorMsg = {signupFormState.errorMsgs.password}
                            handleInput = {handlePasswordInput}
                        />
                        <FormInputContainer
                            key = "rePassword"
                            id = "rePassword"
                            lableText = "Repet Password"
                            type = "password"
                            required = {false} 
                            isValid = {signupFormState.validities.rePassword}
                            errorMsg = {signupFormState.errorMsgs.rePassword}
                            handleInput = {handleRePasswordInput}
                        />
                    </div>
                        <Link to="/users/login" className="login-link">
                            Already a part of us? Click here to login
                        </Link>
                    <button className="signup-form-btn" type="submit">SignUp</button>
                    


                        
                </form>
            </Card>
        </main>
    )
};

export default SignUpPage;