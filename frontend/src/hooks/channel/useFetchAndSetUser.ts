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
                console.log('최초 로그인 유저 로직 진입')
                goToViewerStep()
            } else {
                console.log('기존 가입 유저 로직 진입')
            }
        } catch (err) {
            console.error('❌ 회원 정보 조회 실패:', err)
            alert('회원 정보 조회 실패')
            navigate('/', { replace: true })
        }
    }

    return { fetchAndSetUser }
}
