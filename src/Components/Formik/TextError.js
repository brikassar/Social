import React from 'react'
import classes from './Formik.module.css'

const TextError = (props) => {
    return (
        <div className={classes.error}>
            {props.children}
        </div>
    );
};

export default TextError