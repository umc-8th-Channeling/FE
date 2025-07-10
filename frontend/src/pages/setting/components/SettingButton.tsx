import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'default' | 'secondary' | 'ghost'
    className?: string
}

export function Button({ children, variant = 'default', className = '', ...props }: ButtonProps) {
    const base =
        'flex items-center p-2 gap-2 rounded-lg w-[135px] font-body tracking-tight self-stretch transition-colors'

    const variants = {
        default: 'bg-white text-black',
        secondary: 'bg-[#262626] text-white',
        ghost: 'bg-transparent text-white hover:bg-[#262626]',
    }

    return (
        <button {...props} className={`${base} ${variants[variant] || ''} ${className}`}>
            {children}
        </button>
    )
}
