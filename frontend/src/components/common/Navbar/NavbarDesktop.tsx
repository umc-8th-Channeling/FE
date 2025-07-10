import ChannelingIcon from '../../../assets/icons/channeling.svg'
import { NavbarLink } from './NavbarLink'
import { TOP_LINKS, BOTTOM_LINKS } from './navbarLinks'
import { NavbarContainer } from './NavbarContainer'
import { ToolTipBubble } from './NavbarToolTip'
import { useState } from 'react'
import LoginModal from '../../../pages/main/_components/LoginModal'
// import { NavbarUserInfo } from './NavbarUserInfo';

export const NavbarDesktop = (): React.ReactElement => {
    const [showLoginModal, setShowLoginModal] = useState(false)

    const handleLoginClick = () => setShowLoginModal(true)
    const handleCloseModal = () => setShowLoginModal(false)

    return (
        <>
            <NavbarContainer>
                <div className="flex flex-col justify-between h-full w-full">
                    <div className="flex flex-col items-center gap-22">
                        <img src={ChannelingIcon} alt="Channeling 로고" className="w-12 h-12" />
                        <div className="flex flex-col items-center gap-6">
                            <NavbarLink {...TOP_LINKS.find((link) => link.to === '/report')!} />
                            <div className="flex flex-col items-center gap-1">
                                {TOP_LINKS.filter((link) => link.to !== '/report').map((link) => (
                                    <NavbarLink key={link.to} {...link} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        {/* 로그인 성공 시 아이콘 변경
      {user ? (
        <NavbarUserInfo user={user} />
      ) : */}
                        {BOTTOM_LINKS.map((link) => (
                            <NavbarLink key={link.alt} {...link} onLoginClick={handleLoginClick} />
                        ))}
                    </div>
                </div>
                <ToolTipBubble />
            </NavbarContainer>

            {showLoginModal && <LoginModal onClose={handleCloseModal} />}
        </>
    )
}
