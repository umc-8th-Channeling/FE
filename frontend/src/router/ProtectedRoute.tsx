import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { useLoginStore } from '../stores/LoginStore'

interface ProtectedRouteProps {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const isAuth = useAuthStore((state) => state.isAuth)
    const openLoginFlow = useLoginStore((state) => state.actions.openLoginFlow)

    useEffect(() => {
        const isLoggingOut = localStorage.getItem('isLoggingOut') === 'true'

        // 로그아웃이 아닌 비로그인 접근일 때만 로그인 모달 열기
        if (!isAuth && !isLoggingOut) {
            openLoginFlow()
        }

        // 클린업: 플래그가 남아있다면 제거
        if (isLoggingOut) {
            setTimeout(() => {
                localStorage.removeItem('isLoggingOut')
            }, 500)
        }
    }, [isAuth, openLoginFlow])

    if (!isAuth) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}
