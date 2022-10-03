import React from 'react';
import {login} from '../../Redux/authReducer';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectCaptchaUrl, selectIsAuth} from '../../Redux/Selectors/authSelector';
import LoginForm from "./LoginForm";



const LoginContainer = ({isAuth, login, captchaUrl}) => {
    if (isAuth) {
        return <Navigate to={'/profile'}/>;
    }

    return (
        <>
            <LoginForm captchaUrl={captchaUrl} login={login}/>
        </>
    );
};

let mapStateToProps = (state) => {
    return {
        isAuth: selectIsAuth(state),
        captchaUrl: selectCaptchaUrl(state)
    };
};

export default connect(mapStateToProps, {login})(LoginContainer);
