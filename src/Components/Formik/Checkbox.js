import React from 'react';
import {ErrorMessage, Field} from "formik";
import TextError from "./TextError";

const Checkbox = (props) => {
    const {label, name, ...rest} = props
    return (
        <div className='formControl'>
            <Field type='checkbox' id={name} name={name} {...rest} />
            <label htmlFor={name}>{label}</label>
        </div>
    );
};

export default Checkbox;
