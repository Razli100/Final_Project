import React from "react";
import './form-input.syles.css';

const FormInput = (props) => {
    return(
        <input
            className = {props.className ? props.className : 'form-input'}
            id = {props.id}
            type = {props.type}
            required = {props.required}
            onInput = {props.handleInput}
        />
    )
};

export default FormInput;