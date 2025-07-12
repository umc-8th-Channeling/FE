import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavbarContainer } from './NavbarContainer'
import { NavbarLink, NavbarModalButton } from './NavbarLink'
import { ToolTipBubble } from './NavbarToolTip'
import Modal from '../../Modal'
import { PLUS_LINK, NAVIGATE_LINKS, LOGIN_LINK } from './navbarLinks'
import ChannelingLogo from '../../../assets/icons/channeling.svg?react'
import { NavbarUserInfo } from './NavbarUserInfo'
import { DUMMY_USER } from './dummy'

type ToolTipPos = { top: number; left: number }

export const NavbarDesktop = () => {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showPlusModal, setShowPlusModal] = useState(false)
    const isGuest = !localStorage.getItem('token')
    const user = DUMMY_USER

    const loginRef = useRef<HTMLDivElement>(null)
    const [tooltipPos, setTooltipPos] = useState<ToolTipPos | null>(null)

    // 로그인 툴팁 위치 계산
    useEffect(() => {
        if (isGuest && loginRef.current) {
            const rect = loginRef.current.getBoundingClientRect()
            setTooltipPos({
                top: rect.top + window.scrollY,
                left: rect.right + window.scrollX + 32,
            })
        }
    }, [isGuest])

    const handleLoginModalClick = () => setShowLoginModal(!showLoginModal)
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

                        <NavbarModalButton {...PLUS_LINK} onClick={handlePlusModalClick} />

                        <div className="flex flex-col items-center gap-2 mt-6">
                            {NAVIGATE_LINKS.map((link) => (
                                <NavbarLink key={link.to} {...link} />
                            ))}
                        </div>
                    </div>

                    {/* 로그인 버튼 혹은 유저 프로필 */}
                    <div ref={loginRef} className="flex flex-col items-center">
                        {!isGuest && user ? (
                            <NavbarUserInfo user={DUMMY_USER} />
                        ) : (
                            <NavbarModalButton key={LOGIN_LINK.alt} {...LOGIN_LINK} onClick={handleLoginModalClick} />
                        )}
                    </div>

                    {/* 게스트일 경우, 10초만에 로그인 툴팁 */}
                    {isGuest && tooltipPos && (
                        <div style={{ position: 'absolute', top: tooltipPos.top, left: tooltipPos.left }}>
                            <ToolTipBubble />
                        </div>
                    )}
                </div>
            </NavbarContainer>

            {/* 로그인 모달 */}
            {showLoginModal && <Modal title="로그인" onClose={handleLoginModalClick} />}
        </>
    )
}
