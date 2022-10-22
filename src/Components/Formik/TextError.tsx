import React from 'react'
import classes from './Formik.module.css'
import {FormikValues} from "formik/dist/types";


const TextError: React.FC<FormikValues> = ({children, ...rest}) => {

    return (
        <div className={classes.error}>
            {children}
        </div>
    );
};

export default TextError