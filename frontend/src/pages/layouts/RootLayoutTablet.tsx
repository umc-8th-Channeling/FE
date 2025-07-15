import { Outlet } from 'react-router-dom'
import { NavbarTablet } from '../../components/common/Navbar/NavbarTablet'

export default function RootLayoutTablet() {
    return (
        <div className="hidden tablet:flex desktop:hidden">
            <NavbarTablet />

            <main className="pt-18 w-full h-screen flex items-center justify-center bg-surface">
                <div className="absolute inset-0 z-0 bg-linear-to-b from-gray-50 to-primary-50" />
                <div className="[&::-webkit-scrollbar]:hidden w-full h-full overflow-y-auto z-10 relative">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
