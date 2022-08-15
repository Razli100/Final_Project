const signupFormActionsTypes = {
    UPDATED_FIRST_NAME: 'UPDATED_FIRST_NAME',
    UPDATE_LAST_NAME: 'UPDATE_LAST_NAME',
    UPDATE_EMAIL: 'UPDATE_EMAIL',
    UPDATE_PASSWORD: 'UPDATE_PASSWORD',
    UPDATE_RE_PASSWORD: 'UPDATE_RE_PASSWORD',
} 

export const updateFirstName = (value, isValid, errorMsg) => {
    const action = {
        type: signupFormActionsTypes.UPDATED_FIRST_NAME,
        payload: {
            value: value,
            isValid: isValid,
            errorMsg: errorMsg,
        },
    };
    return action;
};

export const updateLastName = (value, isValid, errorMsg) => {
    const action = {
        type: signupFormActionsTypes.UPDATE_LAST_NAME,
        payload: {
            value: value,
            isValid: isValid,
            errorMsg: errorMsg,  
        },
    };
    return action;
};

export const updateEmailAction = (value, isValid, errorMsg) => {
    const action = {
        type: signupFormActionsTypes.UPDATE_EMAIL,
        payload: {
            value: value,
            isValid: isValid,
            errorMsg: errorMsg,   
        },
    };
    return action;
};

export const updatePasswordAction = (value, isValid, errorMsg) => {
    const action = {
        type: signupFormActionsTypes.UPDATE_PASSWORD,
        payload: {
            value: value,
            isValid: isValid,
            errorMsg: errorMsg,   
        },
    };
    return action;
};

export const updateRePasswordAction = (value, isValid, errorMsg) => {
    const action = {
        type: signupFormActionsTypes.UPDATE_RE_PASSWORD,
        payload: {
            value: value,
            isValid: isValid,
            errorMsg: errorMsg,   
        },
    };
    return action;
};

export default signupFormActionsTypes;