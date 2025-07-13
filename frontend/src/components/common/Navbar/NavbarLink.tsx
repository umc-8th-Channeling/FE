import { NavLink } from 'react-router-dom'
import { IconWrapper } from '../IconWrapper'
import type { LinkItem } from './navbarLinks'

{
    /* NavbarLinksList의 className을 받도록 재설정 */
}
type NavbarLinkProps = LinkItem & {
    className?: string
    onLoginClick?: () => void
}

export const NavbarLink = (props: NavbarLinkProps): React.ReactElement => {
    const { to, label, defaultIcon, hoverIcon, activeIcon, alt, isCircle, size, className, action, onLoginClick } =
        props

    // 모달용
    if (action === 'login') {
        return (
            <button onClick={onLoginClick} className={`block z-10 ${className ?? ''}`}>
                <div className="flex flex-col items-center py-2">
                    <IconWrapper
                        defaultIcon={defaultIcon}
                        hoverIcon={hoverIcon}
                        activeIcon={activeIcon}
                        alt={alt}
                        isCircle={isCircle}
                        isActive={false}
                        size={size}
                    />
                    {label && <span className={`font-label-fixed text-gray-900 mt-[5px]`}>{label}</span>}
                </div>
            </button>
        )
    }

    // 기본
    return (
        <NavLink to={to} end={true} className={`block ${className ?? ''}`}>
            {({ isActive }) => (
                <div className="flex flex-col items-center py-2">
                    <IconWrapper
                        defaultIcon={defaultIcon}
                        hoverIcon={hoverIcon}
                        activeIcon={activeIcon}
                        alt={alt}
                        isCircle={isCircle}
                        isActive={isActive}
                        size={size}
                    />
                    {label && (
                        <span
                            className={`font-label-fixed text-gray-900
              ${label === '로그인' ? 'mt-[5px]' : 'mt-2'}`}
                        >
                            {label}
                        </span>
                    )}
                </div>
            )}
        </NavLink>
    )
}
