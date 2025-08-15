import { useNavigate } from 'react-router-dom'
import { logoutCore } from '../utils/auth'

export function useLogout() {
    const navigate = useNavigate()

    return async () => {
        await logoutCore()
        navigate('/', { replace: true })
    }
}
