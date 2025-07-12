import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavbarContainer } from './NavbarContainer'
import { NavbarLink } from './NavbarLink'
import { ToolTipBubble } from './NavbarToolTip'
import Modal from '../../Modal'
import { TOP_LINKS, BOTTOM_LINKS } from './navbarLinks'
import ChannelingLogo from '../../../assets/icons/channeling.svg?react'
// import { NavbarUserInfo } from './NavbarUserInfo';

type ToolTipPos = { top: number; left: number }

export const NavbarDesktop = () => {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const isGuest = !localStorage.getItem('token')

    const loginRef = useRef<HTMLDivElement>(null)
    const [tooltipPos, setTooltipPos] = useState<ToolTipPos | null>(null)

    useEffect(() => {
        if (isGuest && loginRef.current) {
            const rect = loginRef.current.getBoundingClientRect()
            setTooltipPos({
                top: rect.top + window.scrollY,
                left: rect.right + window.scrollX + 32,
            })
        }
    }, [isGuest])

    const handleShowModalChange = () => setShowLoginModal(!showLoginModal)

    return (
        <>
            <NavbarContainer>
                <div className="flex flex-col justify-between h-full w-full">
                    <div className="flex flex-col items-center gap-22">
                        <Link to="/">
                            <ChannelingLogo />
                        </Link>
                        <div className="flex flex-col items-center gap-6">
                            <NavbarLink {...TOP_LINKS.find((link) => link.to === '/report')!} />
                            <div className="flex flex-col items-center gap-2">
                                {TOP_LINKS.filter((link) => link.to !== '/report').map((link) => (
                                    <NavbarLink key={link.to} {...link} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div ref={loginRef} className="flex flex-col items-center">
                        {/* 로그인 성공 시 아이콘 변경
                        {user ? (
                            <NavbarUserInfo user={user} />
                        ) : */}
                        {BOTTOM_LINKS.map((link) => (
                            <NavbarLink key={link.alt} {...link} onLoginClick={handleShowModalChange} />
                        ))}
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
            {showLoginModal && <Modal title="로그인" onClose={handleShowModalChange} />}
        </>
    )
}
