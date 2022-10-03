import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';


const instance: any = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '072ce522-7de1-4a2b-b53e-05bfb42fcfd7'},
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then((response: any) => {
                return response.data;
            });
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

    getProfile(userId: number) {
        console.warn('Obsolete method. Please use profileAPI object');
        return profileAPI.getProfile(userId);
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

    saveProfile(profile: any) {
        return instance.put(`profile`, profile );
    }
};


export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },

    login(email: string | null, password: string | null, rememberMe = false, captcha='null') {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha});
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
