import { useNavigate } from 'react-router-dom'
import { logoutCore } from '../utils/auth'

export function useLogout() {
    // const navigate = useNavigate()

    return async () => {
        await logoutCore()
        //메인 페이지로 이동
        // navigate('/', { replace: true })
    }
}
