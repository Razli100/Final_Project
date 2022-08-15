import loginFormActionTypes from '../actions/login-form-actions';

export const LOGIN_FORM_INITIAL_STATE = {
    values: {
        email: '',
        password: '',
    },
    validities: {
        email: true,
        password: true,
    },
    errorMsgs: {
        email: '',
        password: '',
    },
};

const loginReducer = (state,action) => {
    switch(action.type) {
        case loginFormActionTypes.UPDATE_EMAIL:{
            const updatedEmailValue = action.payload.value;
            const updatedIsEmailValid = action.payload.isValid;
            const updatedEmailErrorMsg = action.payload.errorMsg;

            const updatedValues = {...state.values, email:updatedEmailValue};
            const updatedValidities = {...state.validities, email:updatedIsEmailValid};
            const updatedErrorMsgs = {...state.errorMsgs, email:updatedEmailErrorMsg};

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMsgs: updatedErrorMsgs,
            };
            return updatedState;
        }
        case loginFormActionTypes.UPDATE_PASSWORD: {
            const updatedPasswordValue = action.payload.value;
            const updatedIsPasswordValid = action.payload.isValid;
            const updatedPasswordErrorMsg = action.payload.errorMsg;

            const updatedValues = {...state.values, password:updatedPasswordValue};
            const updatedValidities = {...state.validities, password:updatedIsPasswordValid};
            const updatedErrorMsgs = {...state.errorMsgs, password:updatedPasswordErrorMsg};

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMsgs: updatedErrorMsgs,
            };
            return updatedState;
        };
        default: {
            return state
        };
    }
}

export default loginReducer;