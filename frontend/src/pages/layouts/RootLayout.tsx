import { useEffect } from 'react'
import RootLayoutDesktop from './RootLayoutDesktop'
import RootLayoutMobile from './RootLayoutMobile'
import RootLayoutTablet from './RootLayoutTablet'

export default function RootLayout() {
    useEffect(() => {
        localStorage.setItem('accessToken', 'temp-token')
        localStorage.setItem('isLogin', 'true')
    }, [])
    return (
        <>
            <RootLayoutDesktop />
            <RootLayoutTablet />
            <RootLayoutMobile />
        </>
    )
}
