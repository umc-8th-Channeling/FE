import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'default' | 'secondary' | 'ghost'
    className?: string
}

export function Button({ children, variant = 'default', className = '', ...props }: ButtonProps) {
    const base = 'flex items-center p-2 gap-2 rounded-lg w-[135px] self-stretch transition-colors'

    const variants = {
        default: 'text-[#F4F4F4]',
        secondary: 'bg-[#262626] text-white font-body tracking-tight',
        ghost: 'bg-transparent text-white font-body tracking-tight',
    }

    return (
        <button {...props} className={`${base} ${variants[variant] || ''} ${className}`}>
            {children}
        </button>
    )
}
