import axios from 'axios'
import { LOCAL_STORAGE_KEY } from '../constants/key'

export const axiosInstance = axios.create({
    // withCredentials: true,
    // baseURL: '/api', //개발 환경에서
    baseURL: import.meta.env.VITE_SERVER_API_URL,
})

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
    const token = window.localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)
    const parsedToken = token ? JSON.parse(token) : null

    if (parsedToken) {
        config.headers.Authorization = `Bearer ${parsedToken}`
    }

    return config
})
