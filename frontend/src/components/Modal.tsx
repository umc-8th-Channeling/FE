import { useEffect, useRef, type PropsWithChildren } from 'react'
import clsx from 'clsx'
import X from '../assets/icons/X.svg?react'

interface ModalProps {
    title: string
    description?: string
    onClose: () => void
    className?: string // className을 props로 전달하여 모달의 스타일 수정이 가능합니다. 예) className="w-[486px]" 전달하여 모달의 크기를 고정

    /**
     * 모달의 수직 정렬 방식
     * - 'center': 화면 세로 중앙 정렬 (기본값)
     * - 'start': 상단 정렬 (스크롤이 필요한 textarea 등 내용이 긴 경우에 사용)
     *   이 경우 className을 통해 mt-[값]으로 위치 조정
     */
    align?: 'center' | 'start'
}

const Modal = ({
    title,
    description,
    onClose,
    className = '',
    align = 'center',
    children,
}: PropsWithChildren<ModalProps>) => {
    const modalRef = useRef<HTMLDivElement>(null)

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
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className={clsx('fixed inset-0 z-50 flex justify-center min-w-[288px]', {
                'items-center': align === 'center',
                'items-start': align === 'start',
            })}
        >
            <div className="absolute inset-0 bg-neutral-black-opacity50" />

            {/* 모달 창 */}
            <div
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                className={`
                    relative flex flex-col min-w-[288px] tablet:min-w-[384px] desktop:min-w-[486px]
                    space-y-4 tablet:space-y-6 bg-surface-elevate-l2 p-6 rounded-3xl
                    ${className}
                `}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close modal"
                    className="cursor-pointer absolute top-4 right-4 tablet:top-6 tablet:right-6"
                >
                    <X />
                </button>

                <div className="text-center whitespace-pre-line space-y-2">
                    <h1
                        id="modal-title"
                        className="
                            text-[16px] leading-[140%] font-bold tracking-[-0.4px] tablet:text-[20px] tablet:tracking-[-0.5px]
                            whitespace-pre-line tablet:whitespace-nowrap    
                        "
                    >
                        {title}
                    </h1>
                    <p
                        id="modal-description"
                        className="text-[14px] leading-[150%] tracking-[-0.35px] tablet:text-[16px] tablet:tracking-[-0.4px] text-gray-600"
                    >
                        {description}
                    </p>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal
