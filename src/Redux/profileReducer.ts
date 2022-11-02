import {PhotosType, PostDataType, ProfileType} from '../types/types'
import {profileAPI} from "../api/profileAPI"
import {BaseThunkType, InferActionsTypes} from "./reduxStore"

export type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>

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

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'my-app/profileReducer/ADD-POST': {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
            }
            return {
                ...state,
                postData: [...state.postData, newPost],
            }
        }

        case 'my-app/profileReducer/DELETE-POST': {
            return {
                ...state, postData: state.postData.filter(p => p.id !== action.postId)
            }
        }

        case 'my-app/profileReducer/SET_PROFILE_STATUS': {
            return {
                ...state,
                profileStatus: action.profileStatus,
            };
        }

        case 'my-app/profileReducer/SET_USER_PROFILE': {
            return {...state, profile: action.profile};
        }

        case 'my-app/profileReducer/SET_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}


        default:
            return state;
    }
};

export const actions = {
    addPost: (newPostText: string) => ({type: 'my-app/profileReducer/ADD-POST', newPostText} as const),
    deletePost: (postId: number) => ({type: 'my-app/profileReducer/DELETE-POST', postId} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'my-app/profileReducer/SET_USER_PROFILE', profile} as const),
    setStatus: (profileStatus: string) => ({type: 'my-app/profileReducer/SET_PROFILE_STATUS', profileStatus} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'my-app/profileReducer/SET_PHOTO_SUCCESS', photos} as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getProfileStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfileStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateProfileStatus = (profileStatus: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateProfileStatus(profileStatus)

        if (data.resultCode === 0) {
            dispatch(actions.setStatus(profileStatus))
        }
    } catch (error: any) {
        debugger;
        alert(error.message)
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)

    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType, setSubmitting: any, setStatus: any): ThunkType =>
    async (dispatch: any, getState) => {

        const userId = getState().auth.userId;
        const data = await profileAPI.saveProfile(profile)

        if (data.resultCode === 0) {
            if (userId != null) {
                dispatch(getUserProfile(userId));

                setSubmitting(false)
            } else {
                throw new Error('UserID cant be null')
            }
        } else {
            console.log('ERROR')
            setStatus(data.messages)
            return Promise.reject(data.messages)
        }
    }


export default profileReducer

