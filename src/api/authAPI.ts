import {instance, APIResponseType, ResultCodeForCaptcha, ResultCodeEnum} from './api'

interface MeResponseDataType {
    id: number,
    email: string,
    login: string
}
interface LoginResponseDataType {
    userId: number,
}

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data);
    },

    login(email: string | null, password: string | null, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptcha>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data);
    },

    logout() {
        return instance.delete(`auth/login`);
    },
};