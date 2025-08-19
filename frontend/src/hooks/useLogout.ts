import { useNavigate } from 'react-router-dom'
import { logoutCore } from '../utils/auth'
import { useQueryClient } from '@tanstack/react-query'

export function useLogout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    try {
        queryClient.clear()
    } catch (e) {
        console.warn('Query cache clear 실패:', e)
    }
    return async () => {
        await logoutCore()
        navigate('/', { replace: true })
    }
}
