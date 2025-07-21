import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'default' | 'secondary' | 'ghost' | 'danger'
    className?: string
}

export function Button({ children, variant = 'default', className = '', ...props }: ButtonProps) {
    const base = 'flex items-center p-2 gap-2 rounded-lg w-full self-stretch'

    const variants = {
        default: 'text-gray-900',
        secondary: 'bg-gray-100 font-body-medium',
        ghost: 'bg-transparent font-body-medium',
        danger: 'bg-primary-500 font-body',
    }

    return (
        <button {...props} className={`${base} ${variants[variant] || ''} ${className}`}>
            {children}
        </button>
    )
}
