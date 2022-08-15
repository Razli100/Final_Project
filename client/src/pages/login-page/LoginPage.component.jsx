import React, {useState,useReducer,useEffect,useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import './login-page.styles.css';
import Card from '../../components/card/Card.component';
import FormInputContainer from '../../components/form/form-input-container/FormInputContainer.component';
import Loader from '../../components/shared/loader/Loader.component';
import loginReducer, {LOGIN_FORM_INITIAL_STATE} from '../../reducers/login-form-reducer';
import isEmail from 'validator/lib/isEmail';
import * as loginFormActions from '../../actions/login-form-actions'
import environments from '../../environments/environments';
import {AuthContext} from '../../contexts/Auth.context'

const API_URL = environments.API_URL;

const LoginPage = () => {
    const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [loginFormState,dispatchLoginFormState] = useReducer(loginReducer,LOGIN_FORM_INITIAL_STATE);
    const authContextValue = useContext(AuthContext);
    console.log(authContextValue)


    const handleSubmit = async(event) => {
        event.preventDefault();

       const values = loginFormState.values;
        const validities = loginFormState.validities;

        if (values.email === '' || values.password === '' || !validities.email || !validities.password) {
            return;
        };

        const loginFormValues = loginFormState.values;
        const data = {
            email: loginFormValues.email,
            password: loginFormValues.password,
        };

        try {
            const response = await fetch(`${API_URL}/users/login`,{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error();
            };
            const responseData = await response.json();
            const token = responseData.data.token;

            localStorage.setItem('user-token',token)
            authContextValue.setUserToken(token);

            navigate('/')
            alert('Welcome Back')

        } catch (error) {
            alert('Something went wrong!')
            console.log(error)
        }
    }

    const handleEmailInput = (event) => {
        const emailInput = event.target.value.toLowerCase().trim();

        if (emailInput === '') {
            dispatchLoginFormState(
                loginFormActions.updatedEmailAction(emailInput,false,'Please Enter An Email Address'))
            return;
        };

        if (!isEmail(emailInput)) {
            dispatchLoginFormState(
                loginFormActions.updatedEmailAction(emailInput,false,'Please Enter A Valid Email Address'))

            return
        };
        dispatchLoginFormState(
            loginFormActions.updatedEmailAction(emailInput,true,''))
    };

    const handlePasswordInput = (event) => {
        const passwordInput = event.target.value.trim();

        if (passwordInput === '') {
            dispatchLoginFormState(
                loginFormActions.updatedPasswordAction(passwordInput,false,'Please Enter A Password'))
            return;
        };

        if (!(passwordInput.length > 6) && !(passwordInput < 20)) {
            dispatchLoginFormState(
                loginFormActions.updatedPasswordAction(passwordInput,false,'Password Should Be 6 To 20 Characters'))
            
            return;
        };
        
        dispatchLoginFormState(loginFormActions.updatedPasswordAction(passwordInput,true,''));
    };

    useEffect(() => {
    
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);
    window.scrollTo(0,0)
    
    return(
        isLoading ? (
            <Loader />
        ) : 
        (
            <main className='login-page'>
                <Card className='login-page-card'>
                    <h1>Welcome Back!</h1>

                    <form className='login-form' onClick={handleSubmit}>
                        <div className='form-group'>

                            <FormInputContainer
                            key = "email" 
                            id = "email"
                            lableText = 'Email:'
                            required = {false}
                            type = 'email'
                            isValid = {loginFormState.validities.email}
                            errorMsgs = {loginFormState.errorMsgs.email}
                            handleInput = {handleEmailInput}
                            />

                            <FormInputContainer 
                            key = "password"
                            id = "password"
                            lableText = 'Password:'
                            required = {false}
                            type = 'password'
                            isValid = {loginFormState.validities.password}
                            errorMsgs = {loginFormState.errorMsgs.password}
                            handleInput = {handlePasswordInput}
                            />
                        </div>
                        <Link to={'/users/signup'}>Not a Reader Yet? Sign Up Here...</Link>
                        <button className="login-form-btn" type="submit">Login</button>
                    </form>

                </Card>
            </main>
            )
        );
};

export default LoginPage;