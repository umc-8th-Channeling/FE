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
                <div className="flex flex-row desktop:flex-col items-center px-2 py-1 gap-4 desktop:gap-2">
                    <IconWrapper
                        defaultIcon={defaultIcon}
                        hoverIcon={hoverIcon}
                        activeIcon={activeIcon}
                        alt={alt}
                        isCircle={isCircle}
                        isActive={isActive}
                        size={size}
                    />
                    <span className="text-[16px] tablet:text-[24px] leading-[150%] font-medium tracking-[-0.6px] desktop:text-[16px] desktop:trakcing-[-0.4px] text-gray-900 whitespace-nowrap">
                        {label}
                    </span>
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
            <div className="flex flex-row desktop:flex-col items-center p-1 desktop:p-0 gap-3 desktop:gap-[5px] cursor-pointer">
                <IconWrapper
                    defaultIcon={defaultIcon}
                    hoverIcon={hoverIcon}
                    activeIcon={activeIcon}
                    alt={alt}
                    isCircle={isCircle}
                    isActive={false}
                    size={size}
                />
                <span className="text-[16px] tablet:text-[24px] leading-[150%] font-medium tracking-[-0.6px] desktop:text-[16px] desktop:trakcing-[-0.4px] text-gray-900 whitespace-nowrap">
                    {label}
                </span>
            </div>
        </button>
    )
}
