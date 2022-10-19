import classes from "../Formik/Formik.module.css";
import React from "react";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from "../Formik/FormikControl";

interface LoginFormValuesTypes {
    captchaUrl: string | null,
    login: (email: string | null, password: string | null, rememberMe: boolean,
     setAuthStatus: any, setSubmitting: any, captcha: string) => void
}

const LoginForm: React.FC<LoginFormValuesTypes> = ({login, captchaUrl}) => {

    const initialValues = {
        email: '',
        password: '',
        rememberMe: false,
        isValid: true,
        captcha: '',

    }

    type initialValuesTypes = typeof initialValues;

    const validationSchemaLoginForm = Yup.object().shape({
        password: Yup.string()
            .min(2, 'Must be longer than 2 characters')
            .max(5, 'Must be shorter than 5 characters')
            .required('Required password'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Required'),
        // captcha: Yup.string()
        //     .required('Required')
    })


    const onSubmit = (values: initialValuesTypes, onSubmitProps: any) => {
        login(
            values.email,
            values.password,
            values.rememberMe,
            onSubmitProps.setStatus,
            onSubmitProps.setSubmitting,
            values.captcha,
        )
        console.log('onsubmit login', values)
    }

    return (
        <div>
            <h2> Login </h2>

            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchemaLoginForm}>

                {(formik) => {
                    console.log('formik props', formik)
                    return (
                        <Form className={classes.loginForm}>
                            <FormikControl control='input' name='email' type='email' label='Email'/>
                            <FormikControl control='input' name='password' type='password' label='Password'/>
                            <FormikControl control='checkbox' name='rememberMe' label='Remember me'/>


                            {captchaUrl && <img src={captchaUrl} alt='captcha'/>}
                            {captchaUrl &&
                            <FormikControl reset='reset' control='input' name='captcha' type='text' label='Captcha'
                                           placeholder='Type the symbols'/>}

                            <button
                                type='submit'
                                disabled={!(formik.isValid) || (formik.isSubmitting)}>
                                Login
                            </button>


                            {formik.status && <div>{formik.status}</div>}
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default LoginForm;