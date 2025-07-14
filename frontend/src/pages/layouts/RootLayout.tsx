<<<<<<< HEAD
import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/common/Footer'
import { NavbarWrapper } from '../../components/common/Navbar/NavbarWrapper'
import { useEffect } from 'react'
=======
import RootLayoutDesktop from './RootLayoutDesktop'
import RootLayoutMobile from './RootLayoutMobile'
import RootLayoutTablet from './RootLayoutTablet'
>>>>>>> a98ad85981cabba03d8a0a85dad6ec15c16198c6

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
