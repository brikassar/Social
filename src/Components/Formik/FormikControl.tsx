import React from 'react';
import Input from "./Input";
import Textarea from "./Textarea";
import Checkbox from "./Checkbox";
import ObjectInput from "./ObjectInput";
import {FormikValues} from "formik/dist/types";

export interface FormikControlPropertiesType {
    control: 'input' | 'textarea' | 'array' | 'radio' | 'checkbox' | 'date' | 'chakraInput'
    name: 'email' | 'password' | 'rememberMe' | 'captcha' | 'messageText'
    type?: 'email' | 'password' | 'text'
    as?: 'textarea'
}


type OwnProps = FormikValues & FormikControlPropertiesType


const FormikControl: React.FC<OwnProps> = (props) => {
    const {control, ...rest} = props
    switch (control) {
        case 'input':
            return <Input {...rest} />
        case 'textarea':
            return <Textarea {...rest} />
        case 'array':
            return <ObjectInput {...rest}/>
        case 'radio':
        case 'checkbox':
            return <Checkbox {...rest}/>
        case 'date':
        case 'chakraInput':

        default:
            return null
    }
}

export default FormikControl