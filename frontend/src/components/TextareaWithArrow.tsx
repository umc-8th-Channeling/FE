import { useEffect, useRef, useState } from 'react';
import Arrow from '../assets/icons/arrow.svg?react';

interface TextareaWithArrowProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    isActive?: boolean;
}

const TextareaWithArrow = ({ value, onChange, placeholder, isActive = true }: TextareaWithArrowProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Desktop, Tablet: 5줄까지 textarea가 늘어납니다. 6줄 부터는 스크롤해서 확인합니다.
    // Mobile: 3줄까지 textarea가 늘어납니다. 4줄 부터는 스크롤해서 확인합니다.
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = 'auto';

        const isMobile = window.innerWidth <= 768;

        const maxLines = isMobile ? 3 : 5;
        const maxHeight = 32 * maxLines;
        textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
    }, [value]);

    return (
        <div
            className={`
                flex flex-col w-[240px] tablet:w-[540px] desktop:w-[744px] p-4 space-y-6
                border font-body-16-r placeholder-gray-600 bg-neutral-white-opacity10 rounded-2xl
                transition duration-300 ${isFocused ? 'border-gray-400' : 'border-transparent'}    
            `}
        >
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                rows={1}
                placeholder={placeholder}
                className="w-full h-fit max-h-[120px] px-2 outline-none resize-none focus:placeholder-transparent"
            />

            <div className="flex justify-end">
                <button
                    type="button"
                    className={`
                        cursor-pointer right-0 flex justify-center items-center w-10 h-10 rounded-full
                        transition-colors duration-300 ${isActive ? 'bg-primary-500' : 'bg-neutral-white-opacity10'}
                    `}
                >
                    <Arrow className={`transition-opacity duration-300 ${!isActive ? 'opacity-20' : 'opacity-100'}`} />
                </button>
            </div>
        </div>
    );
};

export default TextareaWithArrow;
