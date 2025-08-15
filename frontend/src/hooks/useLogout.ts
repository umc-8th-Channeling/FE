import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { logoutCore } from '../utils/auth'

export function useLogout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    return async () => {
        await logoutCore()
        // React Query 캐시 정리
        try {
            queryClient.clear()
        } catch (e) {
            console.warn('Query cache clear 실패:', e)
        }
        navigate('/', { replace: true })
    }
}
