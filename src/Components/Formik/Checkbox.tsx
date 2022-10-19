import React from 'react';
import {Field} from "formik";
import {CommonFormikPropsType} from "./FormikControl";



const Checkbox: React.FC<CommonFormikPropsType> = (props) => {
    const {label, name, ...rest} = props
    return (
        <div className='formControl'>
            <Field type='checkbox' id={name} name={name} {...rest} />
            <label htmlFor={name}>{label}</label>
        </div>
    );
};

export default Checkbox;
