import axios from 'axios'
import { LOCAL_STORAGE_KEY } from '../constants/key'

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: '/api',
    // baseURL: import.meta.env.VITE_SERVER_API_URL,
})

//요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})
