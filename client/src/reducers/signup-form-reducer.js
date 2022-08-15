import signupFormActionsTypes from '../actions/signup-form-actions.js';

export const SIGNUP_FORM_INITITAL_STATE = {
    values: {
        firstName:'',
        lastName: '',
        email: '',
        password: '',
        rePassword: ''
    },

    validities:{
        firstName:true,
        lastName: true,
        email: true,
        password: true,
        rePassword: true
    },

    errorMsgs:{
        firstName:'',
        lastName: '',
        email: '',
        password: '',
        rePassword: ''    
    },
};

const signupFormReducer = (state, action) => {
    switch (action.type){
        case signupFormActionsTypes.UPDATED_FIRST_NAME: {
            const updateFirstNameValue = action.payload.value;
            const updateFirstNameValid = action.payload.isValid;
            const updateFirstNameErrorMsg = action.payload.errorMsg;

            const updateValues = {...state.values,firstName:updateFirstNameValue};
            const updateValidities = {...state.validities, firstName:updateFirstNameValid};
            const updateErrorMsgs = {...state.errorMsgs, firstName:updateFirstNameErrorMsg};

            const updateState = {
                values: updateValues,
                validities: updateValidities,
                errorMsgs: updateErrorMsgs,
            };
            return updateState;
        };
        case signupFormActionsTypes.UPDATE_LAST_NAME:{
            const updateLastNameValue = action.payload.value;
            const updateLastNameValid = action.payload.isValid;
            const updateLastNameErrorMsg = action.payload.errorMsg;

            const updateValues = {...state.values,lastName:updateLastNameValue};
            const updateValidities = {...state.validities, lastName:updateLastNameValid};
            const updateErrorMsgs = {...state.errorMsgs, lastName:updateLastNameErrorMsg};

            const updateState = {
                values: updateValues,
                validities: updateValidities,
                errorMsgs: updateErrorMsgs,
            };
            return updateState;    
        };
        case signupFormActionsTypes.UPDATE_EMAIL:{
            const updateEmailValue = action.payload.value;
            const updateEmailValid = action.payload.isValid;
            const updateEmailErrorMsg = action.payload.errorMsg;

            const updateValues = {...state.values,email:updateEmailValue};
            const updateValidities = {...state.validities, email:updateEmailValid};
            const updateErrorMsgs = {...state.errorMsgs, email:updateEmailErrorMsg};

            const updateState = {
                values: updateValues,
                validities: updateValidities,
                errorMsgs: updateErrorMsgs,
            };
            return updateState;    
        };
        case signupFormActionsTypes.UPDATE_PASSWORD: {
            const updatePasswordValue = action.payload.value;
            const updatePasswordValid = action.payload.isValid;
            const updatePasswordErrorMsg = action.payload.errorMsg;

            const updateValues = {...state.values,password:updatePasswordValue};
            const updateValidities = {...state.validities, password:updatePasswordValid};
            const updateErrorMsgs = {...state.errorMsgs, password:updatePasswordErrorMsg};

            const updateState = {
                values: updateValues,
                validities: updateValidities,
                errorMsgs: updateErrorMsgs,
            };
            return updateState;        
        };
        case signupFormActionsTypes.UPDATE_RE_PASSWORD:{
            const updateRePasswordValue = action.payload.value;
            const updateRePasswordValid = action.payload.isValid;
            const updateRePasswordErrorMsg = action.payload.errorMsg;

            const updateValues = {...state.values,rePassword:updateRePasswordValue};
            const updateValidities = {...state.validities, rePassword:updateRePasswordValid};
            const updateErrorMsgs = {...state.errorMsgs, rePassword:updateRePasswordErrorMsg};

            const updateState = {
                values: updateValues,
                validities: updateValidities,
                errorMsgs: updateErrorMsgs,
            
            };
            console.log(updateState)
            return updateState; 
        };
        default: {
            return state;
        };
    };            
};

export default signupFormReducer;