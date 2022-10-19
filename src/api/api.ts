import axios from 'axios';
import {ProfileType} from "../types/types";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '072ce522-7de1-4a2b-b53e-05bfb42fcfd7'},
});



export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },

    unfollow(id: number) {
        return instance.delete(`follow/${id}`).then((response: any) => {
            return response.data.resultCode;
        });
    },

    follow(id: number) {
        return instance.post(`follow/${id}`).then((response: any) => {
            return response.data.resultCode;
        });
    },


    getProfileStatus(userId: number) {
        console.warn('Obsolete method. Please use profileAPI object');
        return profileAPI.getProfileStatus(userId);
    },
};


export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId);
    },

    getProfileStatus(userId: number) {
        return instance.get(`profile/status/` + userId);
    },

    updateProfileStatus(profileStatus: string) {
        return instance.put(`profile/status/`, {status: profileStatus});
    },

    savePhoto(photoFile: string) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instance.put(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile);
    }
};


export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: ResultCodesEnum,
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number,
    },
    resultCode: ResultCodesEnum | ResultCodeForCaptcha,
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },

    login(email: string | null, password: string | null, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data);
    },

    logout() {
        return instance.delete(`auth/login`);
    },
};


export const securityAPI: any = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    },

};


