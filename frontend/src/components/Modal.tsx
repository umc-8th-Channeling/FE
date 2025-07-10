import { useEffect, useRef, type PropsWithChildren } from 'react'
import X from '../assets/icons/X.svg?react'

interface ModalProps {
    title: string
    description?: string
    onClose: () => void
    className?: string // className을 props로 전달하여 모달의 스타일 수정이 가능합니다. 예) className="w-[486px]" 전달하여 모달의 크기를 고정
}

const Modal = ({ title, description, onClose, className = '', children }: PropsWithChildren<ModalProps>) => {
    const modalRef = useRef<HTMLDivElement>(null)

    // ESC 키로 모달 창 닫기
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    // 모달 창 열려 있는 동안 스크롤 금지
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    return (
        <div
            onClick={onClose} // 배경 클릭으로 모달 창 닫기
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="fixed inset-0 z-50 flex items-center justify-center min-w-[288px]"
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
