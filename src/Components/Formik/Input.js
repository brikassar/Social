import React from 'react';
import {ErrorMessage, Field} from "formik";
import TextError from "./TextError";
import classes from './Formik.module.css'



const Input = (props) => {
    const { label, name, ...rest } = props
    return (
        <div className={classes.formControl}>
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} {...rest} />
            <ErrorMessage component={TextError} name={name} />
        </div>
    );
};

export default Input;


