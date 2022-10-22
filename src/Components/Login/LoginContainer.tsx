import React from 'react';
import {login} from '../../Redux/authReducer';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectCaptchaUrl, selectIsAuth} from '../../Redux/Selectors/authSelector';
import LoginForm from "./LoginForm";
import {AppStateType} from "../../Redux/reduxStore";


const LoginContainer: React.FC<MapStateToPropsType & MapDispatchToPropsType> = ({isAuth, login, captchaUrl}) => {
    if (isAuth) {
        return <Navigate to={'/profile'}/>;
    }

    return (
        <>
            <LoginForm captchaUrl={captchaUrl} login={login}/>
        </>
    );
};


type MapDispatchToPropsType = {
    login:  (email: string | null, password: string | null, rememberMe: boolean,
             setAuthStatus: (status: any) => void, setSubmitting: (isSubmitting: boolean) => void, captcha: string) => void
}

type MapStateToPropsType = {
    isAuth: boolean,
    captchaUrl: string | null
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: selectIsAuth(state),
        captchaUrl: selectCaptchaUrl(state)
    };
};

export default connect(mapStateToProps, {login})(LoginContainer);
