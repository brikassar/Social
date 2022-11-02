import {instance} from "./api";

interface GetCaptchaUrlResponseType {
    url: string
}

export const securityAPI: any = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`).then(res => res.data);
    },

};