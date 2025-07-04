import { useEffect, useRef, type PropsWithChildren } from 'react';
import X from '../assets/icons/X.svg?react';

interface ModalProps {
    title: string;
    description?: string;
    onClose: () => void;
}

const Modal = ({ title, description, onClose, children }: PropsWithChildren<ModalProps>) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // ESC 키로 모달 창 닫기
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // 모달 창 열려 있는 동안 스크롤 금지
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

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
                className="
                    relative flex flex-col min-w-[288px] tablet:min-w-[384px] desktop:min-w-[486px]
                    space-y-6 bg-surface-elevate-l2 p-6 rounded-3xl
                "
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close modal"
                    className="cursor-pointer absolute top-6 right-6"
                >
                    <X />
                </button>

                <div className="text-center whitespace-pre-line space-y-2">
                    <h1 id="modal-title" className="font-title-20-b">
                        {title}
                    </h1>
                    <p id="modal-description" className="font-body-16-r text-gray-600">
                        {description}
                    </p>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
