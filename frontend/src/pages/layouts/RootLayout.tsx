import { Outlet, useLocation } from 'react-router-dom'
import { NavbarWrapper } from '../../components/common/Navbar/NavbarWrapper'

export default function RootLayout() {
    const location = useLocation()
    const isMain = location.pathname === '/'

    return (
        <div>
            <NavbarWrapper />

            <main className="ml-18 h-screen flex items-center justify-center bg-surface">
                <div className="m-2 w-full h-[calc(100%-16px)] rounded-lg overflow-hidden relative">
                    {/* 메인 페이지일 경우 고정 위치 그라데이션 배경 */}
                    {isMain && <div className="absolute inset-0 z-0 bg-linear-to-b from-gray-50 to-primary-50" />}

                    <div
                        className={`[&::-webkit-scrollbar]:hidden w-full h-full overflow-y-auto z-10 relative ${
                            !isMain && 'bg-gray-50' // 메인 페이지가 아닐 경우 디폴트 배경 bg-gray-50
                        }`}
                    >
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}
