import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { getMyProfile } from '../../api/channel'
import { useLoginStore } from '../../stores/LoginStore'

export function useFetchAndSetUser() {
    const navigate = useNavigate()
    const setUser = useAuthStore((state) => state.actions.setUser)
    const setAuthMember = useAuthStore((state) => state.actions.setAuthMember)
    const goToViewerStep = useLoginStore((state) => state.actions.goToViewerStep)

    const fetchAndSetUser = async (channelId: number, isNew: boolean) => {
        try {
            const { result } = await getMyProfile()
            const newUser = { ...result, channelId }
            setUser(newUser)
            setAuthMember()
            if (isNew) {
                goToViewerStep()
            } else {
                // here is nothing to do.
            }
        } catch {
            alert('회원 정보 조회 실패')
            navigate('/', { replace: true })
        }
    }

    return { fetchAndSetUser }
}
