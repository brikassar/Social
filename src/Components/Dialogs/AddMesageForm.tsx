import {Formik, Form} from "formik"
import * as Yup from "yup"
import FormikControl from "../Formik/FormikControl"
import React from "react"
import {FormikValues} from "formik/dist/types";


const AddMessageForm: React.FC<FormikValues> = (props) => {


    const validationSchemaMessageForm = Yup.object().shape({
        messageText: Yup.string()
            .max(1000, "Must be shorter than 1000 characters")
            .required("")
    })


    const onSubmit = (messageText: InitialValuesType, {resetForm}: FormikValues) => {
        props.sendMessage(messageText.messageText,)
        resetForm({messageText: ''})
    }

    type InitialValuesType = typeof initialValues
    const initialValues = {
        messageText: ''
    }


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchemaMessageForm}>
            {() => (
                <Form>
                    <FormikControl control='textarea' name='messageText'/>
                    <button type={'submit'}>Send</button>
                </Form>
            )}
        </Formik>
    )

}

export default AddMessageForm

