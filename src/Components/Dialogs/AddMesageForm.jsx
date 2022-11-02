import {Formik, Form} from "formik"
import * as Yup from "yup"
import FormikControl from "../Formik/FormikControl"
import React from "react"

const AddMessageForm = (props) => {


    const validationSchemaMessageForm = Yup.object().shape({
        newMessageBody: Yup.string()
            .max(1000, "Must be shorter than 1000 characters")
            .required("")
    })


    const onSubmit = (newMessageBody, {resetForm}) => {
        props.sendMessage(newMessageBody.newMessageBody,)
        resetForm({newMessageBody: ''})
    }

    const initialValues = {
        newMessageBody: ''
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchemaMessageForm}>
            {(formik) => (
                <Form>
                    <FormikControl control='textarea' name='newMessageBody'/>
                    <button type={'submit'}>Send</button>
                </Form>
            )}
        </Formik>
    )

}

export default AddMessageForm