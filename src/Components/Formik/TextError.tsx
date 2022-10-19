import React, {ReactNode} from 'react'
import classes from './Formik.module.css'


const TextError: React.FC<any> = (props) => {
    return (
        <div className={classes.error}>
            {props.children}
        </div>
    );
};

export default TextError