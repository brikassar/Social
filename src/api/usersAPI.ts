import {GetItemsType, instance, APIResponseType} from "./api";
import {profileAPI} from "./profileAPI";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },

    follow(id: number) {
        return instance.post(`follow/${id}`).then(res => res.data)
    },

    unfollow(id: number) {
        return instance.delete(`follow/${id}`).then(res => res.data) as Promise<APIResponseType>
    },
    
};