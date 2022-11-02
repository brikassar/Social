import axios from 'axios';
import {UsersType} from "../types/types";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': '072ce522-7de1-4a2b-b53e-05bfb42fcfd7'},
});

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export interface GetItemsType {
    items: Array<UsersType>
    totalCount: number,
    error: string | null
}


export interface APIResponseType<D = {}, RC = ResultCodeEnum> {
    data: D
    messages: Array<string>
    resultCode: RC
}

export class CaptchaIsRequired2 {
}