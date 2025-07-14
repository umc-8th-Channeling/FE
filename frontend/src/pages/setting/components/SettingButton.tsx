import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'default' | 'secondary' | 'ghost' | 'danger'
    className?: string
}

export function Button({ children, variant = 'default', className = '', ...props }: ButtonProps) {
    const base = 'flex items-center p-2 gap-2 rounded-lg w-[135px] self-stretch'

    const variants = {
        default: 'text-[#F4F4F4]',
        secondary: 'bg-[#262626] text-[#F4F4F4] font-body tracking-[-0.4px]',
        ghost: 'bg-transparent text-[#F4F4F4] font-body tracking-[-0.4px]',
        danger: 'bg-[#fa4d56] text-[#F4F4F4] font-body tracking-[-0.4px]',
    }

    return (
        <button {...props} className={`${base} ${variants[variant] || ''} ${className}`}>
            {children}
        </button>
    )
}
