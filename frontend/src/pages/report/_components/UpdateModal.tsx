import Modal from '../../../components/Modal'

interface UpdateModalProps {
    handleModalClick: () => void
    handleResetTab: () => void
}

export const UpdateModal = ({ handleModalClick, handleResetTab }: UpdateModalProps) => {
    const handleUpdateClick = () => {
        console.log('Report Page: update')

        handleResetTab() // 업데이트 후 탭 초기화
        handleModalClick()
    }

    return (
        <Modal
            title="리포트를 업데이트 하시겠어요?"
            description={`현재 시각 기준으로 다시 분석합니다. \n기존 아이디어 카드는 삭제되며 복구할 수 없습니다. \n필요한 카드는 미리 북마크해 주세요.`}
            onClose={handleModalClick}
            className="tablet:min-w-[486px]"
        >
            <div
                className="
                    flex justify-end gap-2 text-[14px] font-bold leading-[150%]
                    tablet:text-[16px] tablet:tracking-[-0.4px]
                "
            >
                <button
                    onClick={handleModalClick}
                    className="cursor-pointer min-w-[103px] px-4 py-2 rounded-2xl border border-gray-300 bg-transparent text-gray-600"
                >
                    취소
                </button>
                <button
                    onClick={handleUpdateClick}
                    className="cursor-pointer min-w-[103px] px-4 py-2 rounded-2xl bg-primary-500"
                >
                    업데이트
                </button>
            </div>
        </Modal>
    )
}
