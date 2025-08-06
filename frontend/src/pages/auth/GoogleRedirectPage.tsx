import { useEffect, useRef } from 'react'
import { LOCAL_STORAGE_KEY } from '../../constants/key'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { useLoginStore } from '../../stores/LoginStore'
import { getMyProfile } from '../../api/channel'

const GoogleLoginRedirectPage = () => {
    const hasRun = useRef(false) // 실행 여부 플래그
    const { goToViewerStep } = useLoginStore().actions

    const navigate = useNavigate()

    const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
    const setAuthMember = useAuthStore((state) => state.actions.setAuthMember)
    const setChannelId = useAuthStore((state) => state.actions.setChannelId)
    const setUser = useAuthStore((state) => state.actions.setUser)

    useEffect(() => {
        if (hasRun.current) return // 이미 실행했으면 무시
        hasRun.current = true

        const urlParams = new URLSearchParams(window.location.search)
        const accessToken = urlParams.get('token')
        const message = urlParams.get('message')
        const channelId = urlParams.get('channelId')
        const isNew = urlParams.get('isNew') === 'true'

        console.log('✅ message:', message)
        console.log('✅ accessToken:', accessToken)
        console.log('✅ channelId:', channelId)
        console.log('✅ isNew:', isNew)

        if (message === 'Success' && accessToken && channelId) {
            console.log('로그인 성공 로직 진입')
            setAccessToken(accessToken)
            // 채널 ID는 localStorage에 항상 저장
            localStorage.setItem('channelId', channelId)

            // Zustand에 저장
            setChannelId(Number(channelId))
            getMyProfile()
                .then((res) => {
                    setUser(res.result) // 상태 저장
                    setAuthMember()
                    console.log('[setUser에 들어가는 값]', res.result)

                    if (isNew) {
                        console.log('최초 로그인 유저 로직 진입')
                        goToViewerStep()
                        navigate('/')
                    } else {
                        console.log('기존 가입 유저 로직 진입')
                        navigate('/')
                    }
                })
                .catch((err) => {
                    console.error('❌ 회원 정보 조회 실패:', err)
                    alert('회원 정보 조회 실패')
                    navigate('/')
                })
        } else {
            console.log('로그인 실패 로직 진입')
            alert('로그인 실패! 다시 시도해주세요.')
            navigate('/')
        }
    }, [navigate, setAccessToken, setAuthMember, setChannelId, setUser, goToViewerStep])

    return <div>구글 로그인 리다이렉트 화면</div>
}

export default GoogleLoginRedirectPage
