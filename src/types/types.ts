export type PhotosType = {
    small: string | null,
    large: string | null
}
export type PostDataType = {
    id: number,
    message: string,
    likesCount: number
}
export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType
}
export type ContactsType = {
    github: string,
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type UsersType = {
    items: UsersItemsType,
    totalCount: string,
    error: string
    map: any | null
    id?: number | null
}

type UsersItemsType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType
    followed: boolean
}