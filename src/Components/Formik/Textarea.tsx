import React from 'react';
import classes from './Formik.module.css'
import {ErrorMessage, Field, FieldAttributes, FieldProps} from "formik";
import TextError from "./TextError";
import {FormikValues} from "formik/dist/types";


const Textarea: React.FC<FormikValues> = (props) => {
    const {label, name, ...rest} = props
    return (
        <div className={classes.formControl}>
            <label htmlFor={name}>{label}</label>
            <Field as='textarea' id={name} name={name} {...rest} />
            <ErrorMessage name={name} component={TextError}/>
        </div>
    );
};

export default Textarea;