import { NavLink } from 'react-router-dom'
import { IconWrapper } from '../IconWrapper'
import type { LinkItem } from './navbarLinks'

{
    /* NavbarLinksList의 className을 받도록 재설정 */
}
type NavbarLinkProps = LinkItem & {
    className?: string
}

export const NavbarLink = (props: NavbarLinkProps): React.ReactElement => {
    const { to, label, defaultIcon, hoverIcon, activeIcon, alt, isCircle, size, className } = props

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
