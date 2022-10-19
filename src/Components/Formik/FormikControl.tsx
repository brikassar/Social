import React from 'react';
import Input from "./Input";
import Textarea from "./Textarea";
import Checkbox from "./Checkbox";
import ObjectInput from "./ObjectInput";


export interface FormikControlTypes {
    control?: string
    type?: string
    reset?: string
    placeholder?: string
    options?: any
}

export interface CommonFormikPropsType {
    label?: string
    name: string
}


const FormikControl: React.FC<FormikControlTypes & CommonFormikPropsType> = (props) => {
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