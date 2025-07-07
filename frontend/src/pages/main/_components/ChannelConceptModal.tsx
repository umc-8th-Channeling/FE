import Modal from '../../../components/Modal'
import TextareaWithArrow from '../../../components/TextareaWithArrow'

interface ChannelConceptModalProps {
    onClose: () => void
    value: string
    onChange: (value: string) => void
}

export default function ChannelConceptModal({ onClose, value, onChange }: ChannelConceptModalProps) {
    return (
        <Modal title="마지막이에요! 유튜버님의 채널 컨셉을 알려주세요." onClose={onClose}>
            <TextareaWithArrow
                value={value}
                onChange={onChange}
                placeholder="정확한 분석을 위해 유튜버님의 채널 컨셉에 대한 설명을 입력해주세요. (예: 브이로그, 게임, 숏츠 위주)"
            />
        </Modal>
    )
}
