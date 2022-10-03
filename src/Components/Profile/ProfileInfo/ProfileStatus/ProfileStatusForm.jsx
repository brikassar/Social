import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import classes from './ProfileStatusForm.module.css'


const validationSchemaStatusForm = Yup.object().shape({

    profileStatus: Yup.string()
        .max(30, "Must be shorter than 30 characters")

});


const AddUserPostForm = (props) => {

    return (

        <div>
            <Formik
                initialValues={{
                    profileStatus: props.profileStatus,
                }}

                validationSchema={validationSchemaStatusForm}
                onSubmit={(profileStatus) => {
                    props.updateProfileStatus(profileStatus.profileStatus);
                    //I need to fix this problem later
                    props.deactivateEditMode();
                }}>

                {() => (
                    <Form>
                        <div>
                            <Field
                                className={classes.profileStatusForm}
                                name={'profileStatus'}
                                type={'text'}
                                placeholder={'Enter your status'}
                                control={'input'}
                                component='textarea'
                            />
                        </div>

                        <ErrorMessage name="profileStatus" component="div"/>

                        <button type={'submit'}>Send</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}


export default AddUserPostForm;










