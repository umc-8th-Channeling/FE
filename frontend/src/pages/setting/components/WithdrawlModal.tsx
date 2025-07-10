import Modal from '../../../components/Modal'
import { Button } from './SettingButton'

type WithdrawlModalProps = {
    onClose: () => void
    onConfirm: () => void
}

export default function WithdrawlModal({ onClose, onConfirm }: WithdrawlModalProps) {
    return (
        <Modal
            title="계정을 탈퇴하시겠어요?"
            description="계정을 삭제하면 모든 기록이 사라지며, 복구가 불가능합니다."
            onClose={onClose}
        >
            <div className="flex items-center justify-end gap-2 mt-6">
                <Button
                    variant="ghost"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 px-4 h-[40px] rounded-[16px] text-sm"
                >
                    취소
                </Button>
                <Button
                    variant="danger"
                    onClick={onConfirm}
                    className="flex items-center justify-center gap-2 px-4 h-[40px] rounded-[16px] text-sm"
                >
                    탈퇴하기
                </Button>
            </div>
        </Modal>
    )
}
