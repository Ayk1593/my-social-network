import axios from "axios";
import {ProfileType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "74f810e7-2ed4-4824-af60-8d8fb5f87fe8"
    }
});


export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            });
    },
    unfollow(id: number) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data
            });
    },
    follow(id: number) {
        return instance.post(`follow/${id}`, {})
            .then(response => {
                return response.data
            });
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {userId: number}
    resultCode: ResultCodesEnum | ResultCodesForCaptcha
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => {
                return response.data
            });
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
    .then(response => {
            return response.data
        });
    },
    logout() {
        return instance.delete(`auth/login`);
    }

}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)

    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
            .then(response => {
                return response.data
            });
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile);
    }
}


export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
}
