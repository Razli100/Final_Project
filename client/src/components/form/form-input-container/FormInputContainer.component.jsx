import React from 'react';
import FormLable from '../form-lable/FormLable.component';
import FormInput from '../form-input/FormInput.component'
import './form-input-container.styles.css';

const FormInputContainer = (props) => {
    return(
        <div className='form-input-container'>
            
            <FormLable htmlFor={props.id} text={props.lableText}/>

            <FormInput id={props.id} type={props.type} required={props.required} handleInput={props.handleInput} />

            {!props.isValid && <div className="error-msg">{props.errorMsg}
                </div>}
                
        </div>  
    )
};

export default FormInputContainer;
