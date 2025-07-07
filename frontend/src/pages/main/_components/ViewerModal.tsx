import Modal from '../../../components/Modal'
import TextareaWithArrow from '../../../components/TextareaWithArrow'

interface ViewerModalProps {
    onClose: () => void
    value: string
    onChange: (value: string) => void
}

export default function ViewerModal({ onClose, value, onChange }: ViewerModalProps) {
    return (
        <Modal title="30초면 완성해요! 유튜버님의 시청자 타겟을 알려주세요." onClose={onClose}>
            <TextareaWithArrow
                value={value}
                onChange={onChange}
                placeholder="정확한 분석을 위해 유튜버님의 시청자 타겟에 대한 설명을 입력해주세요. (예: 20대, 여성)"
            />
        </Modal>
    )
}
