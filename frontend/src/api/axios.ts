import axios from 'axios'
import { LOCAL_STORAGE_KEY } from '../constants/key'
import { logoutCore } from '../utils/auth'

export const axiosInstance = axios.create({
    // withCredentials: true,
    // baseURL: '/api',
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

//응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        //HTTP 상태 코드
        const status = error?.response?.status
        //요청했던 URL 경로
        const originalUrl: string | undefined = error?.config?.url
        //네트워크 에러면 던짐
        if (!status) return Promise.reject(error)
        //로그인 / 회원가입 등의 일부 엔드포인트는 제외 - 무한루프 방지
        const exempt = originalUrl?.includes('/auth/login') || originalUrl?.includes('auth/signup')
        if (status === 401 && !exempt) {
            await logoutCore()
        }
        return Promise.reject(error)
    }
)
