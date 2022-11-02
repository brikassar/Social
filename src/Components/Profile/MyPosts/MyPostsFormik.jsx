import {Formik, Form} from "formik";
import * as Yup from "yup";
import classes from './MyPosts.module.css';
import FormikControl from "../../Formik/FormikControl";
import React from "react";


const AddUserPostForm = (props) => {

    const validationSchemaMessageForm = Yup.object().shape({
        text: Yup.string()
            .max(1000, "Must be shorter than 1000 characters")
            .required('')
    });

    const onSubmit = (text, {resetForm}) => {
        props.addPost(text.text);
        resetForm({text: ''})
    }

    const initialValues = {
        text: ''
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchemaMessageForm}
                onSubmit={onSubmit}>

                {() => (
                    <Form>
                        <FormikControl control='textarea' name='text'/>

                        <button className={classes.button}
                                type={'submit'}>Send
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddUserPostForm;