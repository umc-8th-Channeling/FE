import { useEffect, useRef } from 'react'
import { LOCAL_STORAGE_KEY } from '../../constants/key'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { useLoginStore } from '../../stores/LoginStore'

const GoogleLoginRedirectPage = () => {
    const hasRun = useRef(false) // 실행 여부 플래그
    const { goToViewerStep } = useLoginStore().actions

    const navigate = useNavigate()

    const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
    const setAuthMember = useAuthStore((state) => state.actions.setAuthMember)
    const setUser = useAuthStore((state) => state.actions.setUser)

    useEffect(() => {
        if (hasRun.current) return // 이미 실행했으면 무시
        hasRun.current = true

        const urlParams = new URLSearchParams(window.location.search)
        const accessToken = urlParams.get('token')
        const message = urlParams.get('message')
        const channelId = urlParams.get('channelId')

        console.log('✅ message:', message)
        console.log('✅ accessToken:', accessToken)
        console.log('✅ channelId:', channelId)
        const previousChannelId = localStorage.getItem('channelId')

        if (message === 'Success' && accessToken) {
            console.log('로그인 성공 로직 진입')
            setAccessToken(accessToken)
            setAuthMember()
            if (!previousChannelId && channelId) {
                console.log('최초 로그인 유저 로직 진입')
                localStorage.setItem('channelId', channelId) // 저장
                setUser({ channelId: Number(channelId) })
                goToViewerStep()
                navigate('/')
            } else {
                console.log('기존 가입 유저 로직 진입')
                setUser({ channelId: Number(channelId) })
                navigate('/')
            }
        } else {
            console.log('로그인 실패 로직 진입')
            alert('로그인 실패! 다시 시도해주세요.')
            navigate('/')
        }
    }, [navigate, setAccessToken, setAuthMember, setUser, goToViewerStep])
    return <div>구글 로그인 리다이렉트 화면</div>
}

export default GoogleLoginRedirectPage
