type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    editing?: boolean
}

export default function Input({ editing, ...props }: InputProps) {
    return (
        <div
            className={`flex flex-col items-start gap-6
        w-full max-w-[561px] h-[36px] p-2 rounded-lg box-border
        bg-[rgba(255,255,255,0.10)]
        ${editing ? 'focus-within:border focus-within:border-gray-400' : ''}
        `}
        >
            <input
                {...props}
                className="w-full h-full box-border border-none
                font-caption-14r placeholder-gray-600
                focus:outline-none"
            />
        </div>
    )
}
