import Modal from '../../../components/Modal'

interface GenerateErrorModalProps {
    onClose: () => void
}

export const GenerateErrorModal = ({ onClose }: GenerateErrorModalProps) => {
    return (
        <Modal
            title="리포트를 생성할 수 없어요"
            description={`입력한 링크를 분석하는 중 오류가 발생했습니다.\n잠시 후 다시 시도하거나, 다른 링크를 입력해 주세요.`}
            onClose={onClose}
        >
            <button
                onClick={onClose}
                className="flex justify-center items-center w-full px-4 py-2 rounded-2xl bg-primary-500 cursor-pointer"
            >
                <span className="text-[14px] tablet:text-[16px] font-bold leading-[150%] tracking-[-0.4px]">확인</span>
            </button>
        </Modal>
    )
}
