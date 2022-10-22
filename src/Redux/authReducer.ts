import {authAPI, ResultCodesEnum, ResultCodeForCaptcha, securityAPI} from "../api/api"
const SET_USER_DATA = 'my-app/authReducer/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'my-app/authReducer/GET_CAPTCHA_URL_SUCCESS'

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    password: null as string | null,
    isAuth: false,
    rememberMe: false,
    captchaUrl: null as string | null // if null, captcha is not required
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}


type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string }
}


export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
})

export const getAuthUsersData = () => async (dispatch: any) => {
    const meData = await authAPI.me()


    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}


export const login = (email: string | null,
                      password: string | null,
                      rememberMe: boolean,
                      setAuthStatus: (status: any) => void,
                      setSubmitting: (isSubmitting: boolean) => void,
                      captcha: string) =>

    async (dispatch: any) => {

        const loginData = await authAPI.login(email, password, rememberMe, captcha)

        if (loginData.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUsersData());
        } else {
            if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }

            setAuthStatus(loginData.messages)
        }
        setSubmitting(false)
    };

export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout();
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
};


export const getCaptchaUrl = () => async (dispatch: any) => {

    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url

    dispatch(getCaptchaUrlSuccess(captchaUrl))

};


export default authReducer

