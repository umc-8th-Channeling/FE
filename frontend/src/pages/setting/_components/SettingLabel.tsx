import type { ReactNode } from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode
    className?: string
}

export function Label({ children, className = '', ...props }: LabelProps) {
    return (
        <label {...props} className={`${className}`}>
            {children}
        </label>
    )
}
