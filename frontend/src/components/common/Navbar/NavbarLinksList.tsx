import { NavbarLink, NavbarModalButton } from './NavbarLink'
import { LOGIN_LINK, NAVIGATE_LINKS, PLUS_LINK } from './navbarLinks'
import { NavbarUserInfo } from './NavbarUserInfo'
import { useAuthStore } from '../../../stores/authStore'
import { DUMMY_USER } from './dummy'

interface NavbarLinksListProps {
    loginButtonRef?: React.RefObject<HTMLDivElement | null>
    handlePlusClick: () => void
    handleLoginClick: () => void
}

export const NavbarLinksList = ({ loginButtonRef, handlePlusClick, handleLoginClick }: NavbarLinksListProps) => {
    const isAuth = useAuthStore((state) => state.isAuth) // ✅ 임시
    const user = DUMMY_USER // ✅ 임시

    const label = loginButtonRef ? undefined : PLUS_LINK.label

    return (
        <div className="flex flex-col justify-between items-start desktop:items-center h-full">
            {/* 네비게이션 메뉴 */}
            <div className="flex flex-col gap-4 desktop:gap-6">
                <NavbarModalButton {...PLUS_LINK} label={label} onClick={handlePlusClick} />
                <div className="flex flex-col gap-4 desktop:gap-2">
                    {NAVIGATE_LINKS.map((link) => (
                        <NavbarLink key={link.to} {...link} />
                    ))}
                </div>
            </div>

            {/* 로그인 버튼 혹은 유저 프로필 */}
            <div ref={loginButtonRef} className="mb-4 desktop:m-0">
                {isAuth && user ? (
                    <NavbarUserInfo user={user} />
                ) : (
                    <NavbarModalButton {...LOGIN_LINK} onClick={handleLoginClick} />
                )}
            </div>
        </div>
    )
}
