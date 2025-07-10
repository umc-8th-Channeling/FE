import Arrow from '../assets/icons/arrow.svg?react'
import type { ButtonType } from '../types/common'

interface ArrowButtonProps {
    type?: ButtonType
    isActive?: boolean
    onClick?: () => void
    className?: string
}

const ArrowButton = ({ type = 'button', isActive = true, onClick, className = '' }: ArrowButtonProps) => {
    return (
        <button
            type={type}
            disabled={!isActive}
            onClick={isActive ? onClick : undefined}
            className={`
                cursor-pointer right-0 flex justify-center items-center rounded-full
                transition-colors duration-300 ${isActive ? 'bg-primary-500' : 'bg-neutral-white-opacity10'}
                ${className}    
            `}
        >
            <Arrow className={`transition-opacity duration-300 ${!isActive ? 'opacity-20' : 'opacity-100'}`} />
        </button>
    )
}

export default ArrowButton
