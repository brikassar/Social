import React from 'react';
import {Field} from "formik";
import {FormikValues} from "formik/dist/types";



const Checkbox: React.FC<FormikValues> = (props) => {
    const {label, name, ...rest} = props
    return (
        <div className='formControl'>
            <Field type='checkbox' id={name} name={name} {...rest} />
            <label htmlFor={name}>{label}</label>
        </div>
    );
};

export default Checkbox;
