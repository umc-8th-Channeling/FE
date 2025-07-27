import { useEffect } from 'react'
import { LOCAL_STORAGE_KEY } from '../../constants/key'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const GoogleLoginRedirectPage = () => {
    const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken)
        console.log('➡️ 현재 URL:', window.location.href)
        console.log('🧩 쿼리 파라미터 전체:', [...urlParams.entries()])
        console.log('✅ GoogleLoginRedirectPage 실행됨!')

        if (accessToken) {
            setAccessToken(accessToken)
            window.location.href = '/'
        }
    }, [setAccessToken])
    return <div>구글 로그인 리다이렉트 화면</div>
}

export default GoogleLoginRedirectPage
