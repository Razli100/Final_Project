const loginFormActionTypes = {
    UPDATE_EMAIL: 'UPDATE_EMAIL',
    UPDATE_PASSWORD: 'UPDATE_PASSWORD',
};

export const updatedEmailAction = (value,isValid,errorMsg) => {
    const action = {
        type:loginFormActionTypes.UPDATE_EMAIL,
        payload:{
            value:value,
            isValid:isValid,
            errorMsg:errorMsg,
        },
    };
    return action;
};

export const updatedPasswordAction = (value,isValid,errorMsg) => {
    const action = {
        type: loginFormActionTypes.UPDATE_PASSWORD,
        payload:{
            value:value,
            isValid:isValid,
            errorMsg:errorMsg,
        },
    };
    return action;
};

export default loginFormActionTypes;
