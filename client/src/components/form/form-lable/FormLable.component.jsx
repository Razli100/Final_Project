import React from 'react';
import'./form-lable.styles.css';

const FormLable = (props) => {
    return(
        <label className={props.className ? props.className : 'form-lable'} htmlFor={props.htmlFor}>
        {props.text}
        </label>
    )
};

export default FormLable;