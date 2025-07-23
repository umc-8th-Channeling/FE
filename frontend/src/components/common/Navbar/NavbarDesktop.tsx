import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ChannelingLogo from '../../../assets/icons/channelingLogo.svg?react'
import { useAuthStore } from '../../../stores/authStore'
import { useLoginStore } from '../../../stores/LoginStore'
import { NavbarLinksList } from './NavbarLinksList'
import { ToolTipBubble } from './NavbarToolTip'
import { UrlInputModal } from '../../../pages/main/_components'
import { useSettingModal } from '../../../pages/setting/components/SettingPageModalController'

type ToolTipPos = { top: number; left: number }

export const NavbarDesktop = () => {
    const [showUrlModal, setShowUrlModal] = useState(false)
    const [tooltipPos, setTooltipPos] = useState<ToolTipPos | null>(null)
    const loginButtonRef = useRef<HTMLDivElement>(null)
    const { openLoginFlow } = useLoginStore().actions

    const isAuth = useAuthStore((state) => state.isAuth)

    const { openModal, Modal: SettingModal } = useSettingModal()

    const handlePlusClick = () => setShowUrlModal(!showUrlModal)

    // 로그인 툴팁 위치 조정
    useEffect(() => {
        const updateTooltipPosition = () => {
            if (!isAuth && loginButtonRef.current) {
                const rect = loginButtonRef.current.getBoundingClientRect()
                setTooltipPos({
                    top: rect.top + window.scrollY,
                    left: rect.right + window.scrollX + 32,
                })
            }
        }

        updateTooltipPosition()

        window.addEventListener('scroll', updateTooltipPosition)
        window.addEventListener('resize', updateTooltipPosition)

        return () => {
            window.removeEventListener('scroll', updateTooltipPosition)
            window.removeEventListener('resize', updateTooltipPosition)
        }
    }, [isAuth])

    return (
        <div className="hidden desktop:block">
            <div className="fixed top-0 left-0 flex flex-col items-center w-20 h-full px-4 py-9 gap-[88px] bg-gray-100">
                <Link to="/">
                    <ChannelingLogo />
                </Link>

                <NavbarLinksList
                    loginButtonRef={loginButtonRef}
                    handlePlusClick={handlePlusClick}
                    handleLoginClick={openLoginFlow}
                    handleUserClick={openModal}
                />
            </div>

            {/* 게스트일 경우, 10초만에 로그인 툴팁 */}
            {!isAuth && tooltipPos && (
                <div style={{ position: 'absolute', top: tooltipPos.top, left: tooltipPos.left }}>
                    <ToolTipBubble />
                </div>
            )}

            {/* + 버튼 유튜브 URL 입력 모달  */}
            {showUrlModal && <UrlInputModal onClose={handlePlusClick} />}

            {/* 설정 모달 */}
            {SettingModal}
        </div>
    )
}
