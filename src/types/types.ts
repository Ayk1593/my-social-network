
export type PostType = {
    id: number
    message: string
    likesCount: number
    date: string
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | any
    fullName: string
    contacts: ContactsType | any
    photos: PhotosType
    aboutMe: string | any

}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
}