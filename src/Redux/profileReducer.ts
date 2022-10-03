import {profileAPI} from '../api/api'
import {PhotosType, PostDataType, ProfileType} from '../types/types';

const DELETE_POST = 'my-app/profileReducer/DELETE-POST'
const ADD_POST = 'my-app/profileReducer/ADD-POST'
const SET_USER_PROFILE = 'my-app/profileReducer/SET_USER_PROFILE'
const SET_PROFILE_STATUS = 'my-app/profileReducer/SET_PROFILE_STATUS'
const SAVE_PHOTO_SUCCESS = 'my-app/profileReducer/SET_PHOTO_SUCCESS'
const SAVE_PROFILE_SUCCESS = 'my-app/profileReducer/SET_PHOTO_SUCCESS'


let initialState = {
    postData: [
        {id: 1, message: 'Wow. This is amazing!', likesCount: 228},
        {id: 2, message: 'What is love?', likesCount: 14},
        {id: 3, message: 'Елизавета', likesCount: 228},
        {id: 4, message: 'Филя', likesCount: 228},
        {id: 5, message: 'Анна', likesCount: 228},
        {id: 6, message: 'Я охочусь на Филю', likesCount: 228},
    ] as Array<PostDataType>,

    profile: null as ProfileType | null,
    profileStatus: '',
    profileUpdateStatus: null,
    newPostText: ''
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.text,
                likesCount: 0,
            };

            return {
                ...state,

                postData: [...state.postData, newPost],
            };
        }

        case DELETE_POST: {
            return {
                ...state, postData: state.postData.filter(p => p.id !== action.postId)
            }
        }

        case SET_PROFILE_STATUS: {
            return {
                ...state,
                profileStatus: action.profileStatus,
            };
        }

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile};
        }

        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}

        case SAVE_PROFILE_SUCCESS:
            return {...state, profile: action.profile}

        default:
            return state;
    }
};

type setUserProfileActionType = {type: typeof SET_USER_PROFILE, profile: ProfileType}
export const setUserProfile = (profile: ProfileType): setUserProfileActionType => ({type: SET_USER_PROFILE, profile})

type setProfileStatusActionType = {type: typeof SET_PROFILE_STATUS, profileStatus: string}
export const setProfileStatus = (profileStatus: string): setProfileStatusActionType => ({
    type: SET_PROFILE_STATUS,
    profileStatus,
});

type addPostType = {type: typeof ADD_POST, text: string}
export const addPost = (text: string): addPostType => ({type: ADD_POST, text})

type deletePostType = {type: typeof DELETE_POST, postId: number}
export const deletePost = (postId: number): deletePostType => ({type: DELETE_POST, postId});

type savePhotoSuccessType = {type: typeof SAVE_PHOTO_SUCCESS, photos: PhotosType}
export const savePhotoSuccess = (photos: PhotosType): savePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos})

type saveProfileSuccessType = {type: typeof SAVE_PROFILE_SUCCESS, photos: PhotosType}
export const saveProfileSuccess = (photos: PhotosType): saveProfileSuccessType => ({type: SAVE_PROFILE_SUCCESS, photos})


export const getUserProfile = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
};

export const getProfileStatus = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getProfileStatus(userId)
    dispatch(setProfileStatus(response.data));
};


export const updateProfileStatus = (profileStatus: string) => async (dispatch: any) => {
    try {
        const response = await profileAPI.updateProfileStatus(profileStatus)

        if (response.data.resultCode === 0) {
            dispatch(setProfileStatus(profileStatus));
        }
    } catch (error: any) {
        debugger;
        alert(error.message)
    }
};

export const savePhoto = (file: any ) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};

export const saveProfile = (profile: ProfileType, setStatus: any, setSubmitting: any) => async (dispatch: any, getState: any) => {

    const userId = getState().auth.userId;

    const response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
        setSubmitting(false)

        console.log('DispatchGETUSERPROFILE')
    } else {
        console.log('ERROR')
        setStatus(response.data.messages)
        return Promise.reject(response.data.messages)

        setSubmitting(false)

    }
};


export default profileReducer;
