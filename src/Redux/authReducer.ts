import {ResultCodeForCaptcha, ResultCodeEnum} from "../api/api"
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";

export type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    password: null as string | null,
    isAuth: false,
    rememberMe: false,
    captchaUrl: null as string | null // if null, captcha is not required
}


const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'my-app/authReducer/SET_USER_DATA':
        case 'my-app/authReducer/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
}

export const actions = {
    setAuthUserData:(userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'my-app/authReducer/SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'my-app/authReducer/GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    } as const)
}


export const getAuthUsersData = (): ThunkType => async (dispatch) => {
    const meData = await authAPI.me()


    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}


export const login = (email: string | null,
                      password: string | null,
                      rememberMe: boolean,
                      setAuthStatus: (status: any) => void,
                      setSubmitting: (isSubmitting: boolean) => void,
                      captcha: string): ThunkType =>

    async (dispatch) => {

        const loginData = await authAPI.login(email, password, rememberMe, captcha)

        if (loginData.resultCode === ResultCodeEnum.Success) {
            await dispatch(getAuthUsersData());
        } else {
            if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                await dispatch(getCaptchaUrl())
            }

            setAuthStatus(loginData.messages)
        }
        setSubmitting(false)
    };

export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout();
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
};


export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))

};



export default authReducer

