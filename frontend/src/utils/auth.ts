import { axiosInstance } from '../api/axios'
import { LOCAL_STORAGE_KEY } from '../constants/key'
import { useAuthStore } from '../stores/authStore'

export async function logoutCore() {
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
    // 4) 삭제 검증
    const gone = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken) === null
    if (!gone) {
        alert('로그아웃에 실패했습니다.')
    }
}
