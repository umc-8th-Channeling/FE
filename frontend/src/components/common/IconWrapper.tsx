import React, { useState } from 'react'

type IconWrapperProps = {
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
}: IconWrapperProps): React.ReactElement => {
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
            className="w-12 h-12 rounded-full bg-[#393939] flex items-center justify-center mb-1"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <img src={currentIcon} alt={alt} className={sizeClass} style={{ aspectRatio: '1 / 1' }} />
        </div>
    ) : (
        <div
            className="flex justify-center items-center mb-2 flex-none"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <img src={currentIcon} alt={alt} className={sizeClass} style={{ aspectRatio: '1 / 1' }} />
        </div>
    )
}
