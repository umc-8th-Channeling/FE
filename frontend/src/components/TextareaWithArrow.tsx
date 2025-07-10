import { useEffect, useRef, useState } from 'react'
import ArrowButton from './ArrowButton'
import type { ButtonType } from '../types/common'

interface TextareaWithArrowProps {
    id: string
    value: string
    onChange: (value: string) => void
    placeholder?: string
    isActive?: boolean
    buttonType?: ButtonType
    onNext?: () => void
}

const TextareaWithArrow = ({
    id,
    value,
    onChange,
    placeholder,
    isActive = true,
    buttonType = 'button',
    onNext,
}: TextareaWithArrowProps) => {
    const [isFocused, setIsFocused] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const isMobile = window.innerWidth <= 768

    // Desktop, Tablet: 5줄까지 textarea가 늘어납니다. 6줄 부터는 스크롤해서 확인합니다.
    // Mobile: 3줄까지 textarea가 늘어납니다. 4줄 부터는 스크롤해서 확인합니다.
    useEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) return

        textarea.style.height = 'auto'

        const maxLines = isMobile ? 3 : 5
        const maxHeight = 32 * maxLines
        textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px'
    }, [value, isMobile])

    return (
        <div
            className={`
                flex flex-col w-[240px] tablet:w-[540px] desktop:w-[744px] p-4 space-y-6
                border placeholder-gray-600 bg-neutral-white-opacity10 rounded-2xl
                transition duration-300 ${isFocused ? 'border-gray-400' : 'border-transparent'}    
            `}
        >
            <textarea
                ref={textareaRef}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                rows={isMobile ? 1 : 3}
                placeholder={placeholder}
                className="
                    w-full h-fit max-h-[65px] tablet:max-h-[120px] tablet:px-2 outline-none resize-none focus:placeholder-transparent
                    text-[14px] leading-[150%] tracking-[-0.35px] tablet:text-[16px] tablet:tracking-[-0.4px]
                    whitespace-pre-line desktop:whitespace-nowrap
                "
            />

            <div className="flex justify-end">
                <ArrowButton type={buttonType} isActive={isActive} onClick={onNext} className="w-10 h-10" />
            </div>
        </div>
    )
}

export default TextareaWithArrow
