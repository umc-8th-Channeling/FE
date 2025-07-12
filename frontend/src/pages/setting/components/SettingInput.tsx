type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    editing?: boolean
}

export default function Input({ editing, ...props }: InputProps) {
    return (
        <div
            className={`flex flex-col items-start gap-6
        w-[561px] h-[36px] p-2 rounded-lg box-border
        bg-[rgba(255,255,255,0.10)]
        ${editing ? 'focus-within:border focus-within:border-[#6F6F6F]' : ''}
        `}
        >
            <input
                {...props}
                className="w-full h-full box-border border-none
                font-caption text-[#F4F4F4] placeholder-[#A8A8A8]
                focus:outline-none"
            />
        </div>
    )
}
