import {ProfileType, SavePhotoResponseDataType} from "../types/types";
import {APIResponseType, instance} from "./api";

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data);
    },

    getProfileStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data);
    },

    updateProfileStatus(profileStatus: string) {
        return instance.put<APIResponseType>(`profile/status/`, {status: profileStatus}).then(res => res.data);
    },

    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    },

    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile).then(res => res.data);
    }
};