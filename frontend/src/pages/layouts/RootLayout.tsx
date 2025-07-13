import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/common/Footer'
import { NavbarWrapper } from '../../components/common/Navbar/NavbarWrapper'
import { useEffect } from 'react'

export default function RootLayout() {
    useEffect(() => {
        localStorage.setItem('accessToken', 'temp-token')
        localStorage.setItem('isLogin', 'true')
    }, [])
    return (
        <div>
            <NavbarWrapper />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
