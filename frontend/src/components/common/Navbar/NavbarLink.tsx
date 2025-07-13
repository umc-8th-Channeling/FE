import { NavLink } from 'react-router-dom'
import { IconWrapper } from '../IconWrapper'
import type { LinkItem } from './navbarLinks'

// NavbarLinksList의 className을 받도록 재설정
type NavbarLinkProps = LinkItem & {
    className?: string
    onClick?: () => void
}

// 누르면 경로 이동하는 Link 버튼
export const NavbarLink = (props: NavbarLinkProps) => {
    const { to, label, defaultIcon, hoverIcon, activeIcon, alt, isCircle, size, className } = props

    return (
        <NavLink to={to} end={true} className={`block ${className ?? ''}`}>
            {({ isActive }) => (
                <div className="flex flex-col items-center px-2 py-1 space-y-2">
                    <IconWrapper
                        defaultIcon={defaultIcon}
                        hoverIcon={hoverIcon}
                        activeIcon={activeIcon}
                        alt={alt}
                        isCircle={isCircle}
                        isActive={isActive}
                        size={size}
                    />
                    {label && <span className="font-label-fixed text-gray-900 whitespace-nowrap">{label}</span>}
                </div>
            )}
        </NavLink>
    )
}

// 누르면 모달이 열리는 버튼
export const NavbarModalButton = (props: NavbarLinkProps) => {
    const { label, defaultIcon, hoverIcon, activeIcon, alt, isCircle, size, className, onClick } = props

    return (
        <button onClick={onClick} className={`block ${className ?? ''}`}>
            <div className="flex flex-col items-center space-y-[5px] cursor-pointer">
                <IconWrapper
                    defaultIcon={defaultIcon}
                    hoverIcon={hoverIcon}
                    activeIcon={activeIcon}
                    alt={alt}
                    isCircle={isCircle}
                    isActive={false}
                    size={size}
                />
                {label && <span className="font-label-fixed text-gray-900">{label}</span>}
            </div>
        </button>
    )
}
