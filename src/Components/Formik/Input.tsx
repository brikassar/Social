import React from 'react';
import {ErrorMessage, Field} from "formik";
import TextError from "./TextError";
import classes from './Formik.module.css'
import {CommonFormikPropsType} from "./FormikControl";



const Input: React.FC<CommonFormikPropsType> = (props) => {
    const { label, name, ...rest } = props


    return (
        <div className={classes.formControl}>
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} {...rest} />
            <ErrorMessage name={name} component={TextError}  />
        </div>
    );
};

export default Input;


