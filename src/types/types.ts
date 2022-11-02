export interface PhotosType {
    small: string | null,
    large: string | null
}

export interface SavePhotoResponseDataType {
    photos: PhotosType
}

export interface PostDataType {
    id: number,
    message: string,
    likesCount: number
}

export interface ProfileType {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType
}

export interface ContactsType {
    github: string,
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export interface UsersType {
    items: UsersItemsType,
    totalCount: string,
    error: string
    map: any | null
    id?: number | null
}

interface UsersItemsType {
    id: number,
    name: string,
    status: string,
    photos: PhotosType
    followed: boolean
}