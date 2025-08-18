import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { LOCAL_STORAGE_KEY } from '../constants/key'
import { useAuthStore } from '../stores/authStore'
import { axiosInstance } from '../api/axios'

export function useLogout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    return async () => {
        // 1) 토큰 삭제
        try {
            localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken)
        } catch {
            alert('토큰 삭제에 실패하였습니다.')
        }

        // 2) 전역 인증 상태 초기화 (persist에도 반영)
        try {
            const { clearAuth } = useAuthStore.getState().actions
            clearAuth?.()
        } catch {
            alert('상태 초기화에 실패하였습니다.')
        }

        // 3) axios Authorization 기본값 제거(방어적)
        try {
            delete axiosInstance.defaults.headers.common.Authorization
        } catch {
            alert('요청 헤더 초기화에 실패하였습니다.')
        }

        // 4) React Query 캐시 정리
        try {
            queryClient.clear()
        } catch {
            alert('캐시 초기화에 실패하였습니다.')
        }

        // 5) 삭제 검증 후 이동
        const gone = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken) === null
        if (!gone) {
            alert('로그아웃에 실패했습니다.')
            return
        }

        navigate('/', { replace: true })
    }
}
