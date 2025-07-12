import { Outlet, useLocation } from 'react-router-dom'
import { NavbarTablet } from '../../components/common/Navbar/NavbarTablet'

export default function RootLayoutTablet() {
    const location = useLocation()
    const isMain = location.pathname === '/'

    return (
        <div className="hidden tablet:flex desktop:hidden">
            <NavbarTablet />

            <main className="pt-18 w-full h-screen flex items-center justify-center bg-surface">
                {/* 메인 페이지일 경우 고정 위치 그라데이션 배경 */}
                {isMain && <div className="absolute inset-0 z-0 bg-linear-to-b from-gray-50 to-primary-50" />}

                <div
                    className={`[&::-webkit-scrollbar]:hidden w-full h-full overflow-y-auto z-10 relative ${
                        !isMain && 'bg-gray-50' // 메인 페이지가 아닐 경우 디폴트 배경 bg-gray-50
                    }`}
                >
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
