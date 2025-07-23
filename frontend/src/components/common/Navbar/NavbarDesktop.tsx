import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavbarContainer } from './NavbarContainer'
import { NavbarLink, NavbarModalButton } from './NavbarLink'
import { ToolTipBubble } from './NavbarToolTip'
import { PLUS_LINK, NAVIGATE_LINKS, LOGIN_LINK } from './navbarLinks'
import ChannelingLogo from '../../../assets/icons/channeling.svg?react'
import { NavbarUserInfo } from './NavbarUserInfo'
import { DUMMY_USER } from './dummy'
import { UrlInputModal } from '../../../pages/main/_components'
import { NavbarModalsContainer } from './NavbarModalsContainer'
import { useLoginStore } from '../../../stores/LoginStore'
import { useAuthStore } from '../../../stores/authStore'

type ToolTipPos = { top: number; left: number }

export const NavbarDesktop = () => {
    // const { showLoginModal, openLoginModal, closeLoginModal } = useAuthStore()

    const { openLoginFlow } = useLoginStore().actions
    const [showPlusModal, setShowPlusModal] = useState(false)
    const isAuth = useAuthStore((state) => state.isAuth) // ✅ 임시
    const user = DUMMY_USER // ✅ 임시

    const loginRef = useRef<HTMLDivElement>(null)
    const [tooltipPos, setTooltipPos] = useState<ToolTipPos | null>(null)

    // 로그인 툴팁 위치 조정
    useEffect(() => {
        const updateTooltipPosition = () => {
            if (!isAuth && loginRef.current) {
                const rect = loginRef.current.getBoundingClientRect()
                setTooltipPos({
                    top: rect.top + window.scrollY,
                    left: rect.right + window.scrollX + 32,
                })
            }
        }

        updateTooltipPosition() // 초기 실행

        // 화면 크기 변경에 따라 툴팁의 위치를 업데이트
        window.addEventListener('scroll', updateTooltipPosition)
        window.addEventListener('resize', updateTooltipPosition)

        return () => {
            window.removeEventListener('scroll', updateTooltipPosition)
            window.removeEventListener('resize', updateTooltipPosition)
        }
    }, [isAuth])

    const handlePlusModalClick = () => setShowPlusModal(!showPlusModal)

    return (
        <>
            <NavbarContainer>
                <div className="flex flex-col justify-between h-full w-full">
                    {/* 네비게이션 메뉴 */}
                    <div className="flex flex-col items-center">
                        <Link to="/" className="mb-22">
                            <ChannelingLogo />
                        </Link>

                        {/* + 버튼 */}
                        <NavbarModalButton {...PLUS_LINK} onClick={handlePlusModalClick} />

                        <div className="flex flex-col items-center gap-2 mt-6">
                            {NAVIGATE_LINKS.map((link) => (
                                <NavbarLink key={link.to} {...link} />
                            ))}
                        </div>
                    </div>

                    {/* 로그인 버튼 혹은 유저 프로필 */}
                    <div ref={loginRef} className="flex flex-col items-center">
                        {isAuth && user ? (
                            <NavbarUserInfo user={DUMMY_USER} />
                        ) : (
                            <NavbarModalButton key={LOGIN_LINK.alt} {...LOGIN_LINK} onClick={openLoginFlow} />
                        )}
                    </div>

                    {/* 게스트일 경우, 10초만에 로그인 툴팁 */}
                    {!isAuth && tooltipPos && (
                        <div style={{ position: 'absolute', top: tooltipPos.top, left: tooltipPos.left }}>
                            <ToolTipBubble />
                        </div>
                    )}
                </div>
            </NavbarContainer>

            {/* 로그인 관련 모달 로직 */}
            <NavbarModalsContainer />

            {/* + 버튼 유튜브 URL 입력 모달  */}
            {showPlusModal && <UrlInputModal onClose={handlePlusModalClick} />}
        </>
    )
}
