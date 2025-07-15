import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReportStore } from '../../../stores/reportStore'

import ArrowButton from '../../../components/ArrowButton'
import { useUrlInput } from '../../../hooks/main/useUrlInput'

interface UrlInputModalProps {
    onClose: () => void
}

export const UrlInputModal = ({ onClose }: UrlInputModalProps) => {
    const navigate = useNavigate()
    const [isFocused, setIsFocused] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)

    const startGenerating = useReportStore((state) => state.actions.startGenerating)
    const endGenerating = useReportStore((state) => state.actions.endGenerating)

    const { register, handleSubmit, isActive } = useUrlInput((url) => {
        console.log('모달에서 받은 URL:', url)

        startGenerating()
        setTimeout(() => {
            endGenerating()
            onClose()
            navigate('/report')
        }, 5000)
    })

    // ESC 키로 모달 창 닫기
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    return (
        <>
            <div
                onClick={onClose} // 배경 클릭으로 모달 창 닫기
                aria-modal="true"
                role="dialog"
                aria-label="유튜브 영상 URL을 입력하세요."
                className="fixed inset-0 z-50 flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-neutral-black-opacity50" />

                {/* 모달 창 */}
                <div
                    ref={modalRef}
                    onClick={(e) => e.stopPropagation()}
                    className={`
                    relative min-w-[588px] px-6 py-4 gap-x-2 rounded-full bg-surface-elevate-l3
                    border transition-colors duration-300 ${isFocused ? 'border-gray-500' : 'border-transparent'}
                `}
                >
                    <form onSubmit={handleSubmit} className="flex flex-row items-center">
                        <input
                            {...register('url')}
                            id="youtube url input"
                            type="url"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="유튜브 영상 URL을 입력하세요."
                            className="
                            flex-1 outline-none placeholder-gray-600 focus:placeholder-transparent
                            text-[16px] leading-[150%] tracking-[-0.4px]
                        "
                        />
                        <ArrowButton type="submit" isActive={isActive} className="size-8" />
                    </form>
                </div>
            </div>
        </>
    )
}
