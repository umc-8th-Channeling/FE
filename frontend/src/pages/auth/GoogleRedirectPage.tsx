import { useEffect, useRef } from 'react'
import { LOCAL_STORAGE_KEY } from '../../constants/key'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import { useFetchAndSetUser } from '../../hooks/channel/useFetchAndSetUser'

const GoogleLoginRedirectPage = () => {
    const navigate = useNavigate()
    const hasRun = useRef(false)

    const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
    const { fetchAndSetUser } = useFetchAndSetUser()

    useEffect(() => {
        if (hasRun.current) return
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
            fetchAndSetUser(Number(channelId), isNew)
        } else {
            console.log('로그인 실패 로직 진입')
            alert('로그인 실패! 다시 시도해주세요.')
            navigate('/')
        }
    }, [navigate, setAccessToken, fetchAndSetUser])

    return <div>구글 로그인 리다이렉트 화면</div>
}

export default GoogleLoginRedirectPage
