import axios from 'axios'
import { LOCAL_STORAGE_KEY } from '../constants/key'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const axiosInstance = axios.create({
    // withCredentials: true,
    // baseURL: '/api', //개발 환경에서
    baseURL: import.meta.env.VITE_SERVER_API_URL,
})

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
    const token = getItem()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})
