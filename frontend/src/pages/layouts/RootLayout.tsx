import { Outlet, useLocation } from 'react-router-dom'
import { NavbarWrapper } from '../../components/common/Navbar/NavbarWrapper'
import ReportLoadingSpinner from '../../components/ReportLoadingSpinner'
import { useLoginStore } from '../../stores/LoginStore'

import ScrollToTop from '../../components/ScrollToTop'
import { NavbarModalsContainer } from '../auth'
import { SettingModalContainer } from '../setting/_components/SettingModalContainer'

export default function RootLayout() {
    const location = useLocation()
    const isMain = location.pathname === '/'

    const isLoginFlowOpen = useLoginStore((state) => state.isLoginFlowOpen)

    return (
        <>
            <NavbarWrapper />

            <SettingModalContainer />

            <main
                className={`
                    w-full h-screen flex items-center justify-center bg-surface
                    tablet:pt-18 desktop:pt-0 desktop:pl-18 
                    pt-14 pl-0 
                `}
            >
                <div className="relative w-full desktop:m-2 h-full desktop:h-[calc(100%-16px)] desktop:rounded-lg overflow-hidden">
                    {/* 메인 페이지일 경우 고정 위치 그라데이션 배경 */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-50 to-primary-50" />

                    <div
                        id="scroll-container"
                        className={`
                            relative w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden
                            bg-linear-to-b from-gray-50 to-primary-50 
                            ${!isMain && 'desktop:bg-none desktop:bg-gray-50'}
                        `}
                    >
                        <ScrollToTop />
                        <Outlet />
                    </div>
                </div>

                <ReportLoadingSpinner />

                {isLoginFlowOpen && <NavbarModalsContainer />}
            </main>
        </>
    )
}
