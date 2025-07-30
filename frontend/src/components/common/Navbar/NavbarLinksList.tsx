import { NavbarLink, NavbarModalButton } from './NavbarLink'
import { LOGIN_LINK, NAVIGATE_LINKS, PLUS_LINK } from './navbarLinks'
import { NavbarUserInfo } from './NavbarUserInfo'
import { useAuthStore } from '../../../stores/authStore'
import { DUMMY_USER } from './dummy'
import useIsMobile from '../../../hooks/main/useIsMobile'
import { useNavigate } from 'react-router-dom'

interface NavbarLinksListProps {
    loginButtonRef?: React.RefObject<HTMLDivElement | null>
    handlePlusClick: () => void
    handleLoginClick: () => void
    handleUserClick: () => void
}

export const NavbarLinksList = ({
    loginButtonRef,
    handlePlusClick,
    handleLoginClick,
    handleUserClick,
}: NavbarLinksListProps) => {
    const isAuth = useAuthStore((state) => state.isAuth)
    const user = DUMMY_USER
    const isMobile = useIsMobile()
    const navigate = useNavigate()

    const label = loginButtonRef ? undefined : PLUS_LINK.label

    const responsiveUserClick = () => {
        if (isMobile) {
            navigate('/setting')
        } else {
            handleUserClick()
        }
    }

    return (
        <div className="flex flex-col justify-between items-start desktop:items-center h-full">
            <div className="flex flex-col gap-4 desktop:gap-6">
                <NavbarModalButton {...PLUS_LINK} label={label} onClick={handlePlusClick} />
                <div className="flex flex-col gap-4 desktop:gap-2">
                    {NAVIGATE_LINKS.map((link) => (
                        <NavbarLink key={link.to} {...link} />
                    ))}
                </div>
            </div>

            <div ref={loginButtonRef} className="mb-4 desktop:m-0">
                {isAuth && user ? (
                    <NavbarUserInfo user={user} onUserClick={responsiveUserClick} />
                ) : (
                    <NavbarModalButton {...LOGIN_LINK} onClick={handleLoginClick} />
                )}
            </div>
        </div>
    )
}
