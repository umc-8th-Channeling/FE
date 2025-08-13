import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import ArrowButton from '../../../components/ArrowButton'
import ErrorIcon from '../../../assets/icons/error.svg?react'
import { useUrlInput } from '../../../hooks/main/useUrlInput'
import { ErrorToast } from './ErrorToast'

interface UrlInputModalProps {
    onClose: () => void
}

export const UrlInputModal = ({ onClose }: UrlInputModalProps) => {
    const [reportId, setReportId] = useState<number | null>(null)
    const [isFocused, setIsFocused] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)

    const { register, handleSubmit, isActive, error } = useUrlInput(setReportId)

    // 리포트 생성 요청 성공 시 모달 창 닫기
    useEffect(() => {
        if (reportId !== null) onClose()
    }, [reportId, onClose])

    // ESC 키로 모달 창 닫기
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    return (
        <div
            onClick={onClose} // 배경 클릭으로 모달 창 닫기
            aria-modal="true"
            role="dialog"
            aria-label="유튜브 영상 URL을 입력하세요."
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            {/* 확인 용 임시 버튼 */}
            <button
                onClick={(e) => {
                    e.stopPropagation()
                }}
                className="absolute top-6 right-4 cursor-pointer z-10 px-6 py-3 rounded-full bg-primary-400"
            >
                모달 에러 확인 용 버튼
            </button>
            {/* 확인 용 임시 버튼 끝 */}

            <div className="absolute inset-0 bg-neutral-black-opacity50" />

            {/* 모달 창 */}
            <div
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                className={clsx(
                    'relative w-[328px] tablet:w-[588px] px-4 py-2 tablet:px-6 tablet:py-4 gap-x-2 rounded-full',
                    'bg-surface-elevate-l3 border transition-colors duration-300',
                    {
                        'border-2 border-error': error,
                        'border-gray-400': !error && isFocused,
                        'border-transparent': !error && !isFocused,
                    }
                )}
            >
                <form onSubmit={handleSubmit} className="flex flex-row items-center">
                    <ErrorIcon
                        className={`transition-opacity duration-300 ${
                            error ? 'opacity-100 max-w-6 mr-2' : 'opacity-0 max-w-0'
                        }`}
                    />
                    <input
                        {...register('url')}
                        id="youtube url input"
                        type="url"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="유튜브 영상 URL을 입력하세요."
                        className="
                            flex-1 outline-none pr-2 placeholder-gray-600 focus:placeholder-transparent
                            text-[16px] leading-[150%] tracking-[-0.4px]
                        "
                    />
                    <ArrowButton type="submit" isActive={isActive} className="size-8" />
                </form>

                <p
                    className={`
                        absolute -bottom-8 text-error text-[14px] leading-[140%] tracking-[-0.35px]
                        transition-all duration-300 ease-in-out ${error ? 'opacity-100' : 'opacity-0'}
                    `}
                >
                    {error}
                </p>
            </div>

            {/* 입력 에러 토스트 */}
            {error && <ErrorToast errorMessage={error} />}
        </div>
    )
}
