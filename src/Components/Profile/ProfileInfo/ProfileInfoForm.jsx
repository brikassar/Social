import React from 'react';
import * as Yup from 'yup';
import {Form, Formik} from 'formik';
import classes from './ProfileInfo.module.css'
import FormikControl from "../../Formik/FormikControl";


const ProfileInfoForm = ({profile, saveProfile, setEditMode}) => {


    const validationSchemaProfileForm = Yup.object().shape({
        fullName: Yup.string().max(30, 'Must be shorter than 30 characters'),
        aboutMe: Yup.string().max(30, 'Must be shorter than 30 characters'),
    });

    const onSubmit = async (profile, onSubmitProps) => {

        await saveProfile(
            profile,
            onSubmitProps.setStatus,
            onSubmitProps.setSubmitting)

        setEditMode(false)


    }


    return (
        <Formik
            initialValues={profile}
            validationSchema={validationSchemaProfileForm}
            onSubmit={onSubmit}>

            {(formik) => (

                <Form>
                    {formik.status && <div>{formik.status}</div>}
                    <FormikControl control='input'
                                   type='text'
                                   name='fullName'
                                   placeholder='Enter your full name'
                                   label='Name'/>
                    <FormikControl control='checkbox'
                                   name='lookingForAJob'
                                   label='Looking for a job'/>
                    <FormikControl control='input'
                                   name='lookingForAJobDescription'
                                   label='My professional skills'
                                   type='text'/>
                    <FormikControl control='input'
                                   name='aboutMe'
                                   label='Describe Your Job'
                                   type='text'/>

                    <FormikControl
                        className={classes.contacts}
                        control='array'
                        name='contacts'
                        label='FAKE'
                        type='text'
                        options={profile.contacts}/>


                    <button className={classes.formControl} disabled={formik.isSubmitting} type={'submit'}>Send</button>



                </Form>
            )}
        </Formik>

    )
}


export default ProfileInfoForm;

