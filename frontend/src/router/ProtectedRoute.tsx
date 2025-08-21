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
        if (!isAuth) {
            openLoginFlow()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!isAuth) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}
