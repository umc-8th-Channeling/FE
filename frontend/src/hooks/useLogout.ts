import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { LOCAL_STORAGE_KEY } from '../constants/key'
import { useAuthStore } from '../stores/authStore'
import { axiosInstance } from '../api/axios'

export function useLogout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    return async () => {
        localStorage.setItem('isLoggingOut', 'true')

        // 1) 토큰 삭제
        try {
            localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken)
        } catch (e) {
            console.error('accessToken 삭제 실패:', e)
        }

        // 2) 전역 인증 상태 초기화 (persist에도 반영)
        try {
            const { clearAuth } = useAuthStore.getState().actions
            clearAuth?.()
        } catch (e) {
            console.error('auth 상태 초기화 실패:', e)
        }

        // 3) axios Authorization 기본값 제거(방어적)
        try {
            delete axiosInstance.defaults.headers.common.Authorization
        } catch (e) {
            console.warn('axios 기본 헤더 제거 실패:', e)
        }

        // 4) React Query 캐시 정리
        try {
            queryClient.clear()
        } catch (e) {
            console.warn('Query cache clear 실패:', e)
        }

        // 5) 삭제 검증 후 이동
        const gone = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken) === null
        if (!gone) {
            alert('로그아웃에 실패했습니다.')
            return
        }

        navigate('/', { replace: true })

        setTimeout(() => {
            localStorage.removeItem('isLoggingOut')
        }, 100)
    }
}
