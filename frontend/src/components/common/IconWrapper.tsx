import { useState } from 'react'

interface IconWrapperProps {
    defaultIcon: string
    hoverIcon?: string
    activeIcon?: string
    alt: string
    label?: string
    isCircle: boolean
    isActive: boolean
    size?: 'sm' | 'md' | 'lg'
}

export const IconWrapper = ({
    defaultIcon,
    hoverIcon,
    activeIcon,
    alt,
    isCircle,
    isActive,
    size = 'md',
}: IconWrapperProps) => {
    const [isHover, setIsHover] = useState(false)

    const currentIcon = isActive ? activeIcon : isHover ? hoverIcon : defaultIcon

    let sizeClass = 'w-6 h-6'
    if (size === 'lg') {
        sizeClass = 'w-10 h-10'
    } else if (size === 'sm') {
        sizeClass = 'w-6 h-6'
    }

    return isCircle ? (
        <div
            className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <img src={currentIcon} alt={alt} className={sizeClass} />
        </div>
    ) : (
        <div
            className="flex justify-center items-center flex-none"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <img src={currentIcon} alt={alt} className={sizeClass} />
        </div>
    )
}
