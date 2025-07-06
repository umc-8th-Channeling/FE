import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/common/Footer'
import { NavbarWrapper } from '../../components/common/Navbar/NavbarWrapper'

export default function RootLayout() {
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
