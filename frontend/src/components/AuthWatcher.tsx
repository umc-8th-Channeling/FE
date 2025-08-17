import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { useEffect } from 'react'

const PUBLIC_PATH = ['/']

export default function AuthWatcher() {
    const navigate = useNavigate()
    const location = useLocation()
    const user = useAuthStore((state) => state.user)

    useEffect(() => {
        if (!user) {
            const isPublic = PUBLIC_PATH.includes(location.pathname)
            if (!isPublic) navigate('/', { replace: true })
            //로그아웃되었을 때 보호 페이지에 있다면 '/'로 이동
        }
    }, [user, location.pathname, navigate])

    return null
}
