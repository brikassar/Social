import React from 'react'
import {Field, ErrorMessage, Form} from 'formik'
import TextError from './TextError'
import classes from "../Profile/ProfileInfo/ProfileInfo.module.css";
import {FormikValues} from "formik/dist/types";


const ObjectInput: React.FC<FormikValues> = (props) =>  {

    const {label, name, options, ...rest} = props

    return (
        <div>
            <strong>Contacts:</strong> {Object.keys(options).map(key => {

            return (
                <div key={key} className={classes.contacts}>
                    <strong>{key}:
                        <Field
                            type={'text'}
                            name={'contacts.' + key}
                            placeholder={key}/>
                    </strong>
                </div>
            )
        })}

            <ErrorMessage name='contacts' component={TextError}/>

        </div>

    )
}

export default ObjectInput
