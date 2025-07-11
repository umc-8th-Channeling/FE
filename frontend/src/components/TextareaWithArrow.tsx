import ArrowButton from './ArrowButton'
import type { ButtonType } from '../types/common'
import Textarea from './Textarea'

interface TextareaWithArrowProps {
    id: string // textarea 요소의 고유 id
    value: string // textarea의 현재 값
    onChange: (value: string) => void // 사용자가 입력한 텍스트가 변경될 때 호출되는 함수
    placeholder?: string
    initialRows?: number // row 개수로 textarea 박스의 초기 높이를 지정할 수 있습니다. 디폴트는 1

    isActive?: boolean // 화살표 버튼의 활성화 여부
    handleButtonClick?: () => void // 화살표 버튼을 클릭했을 때 실행할 함수를 전달합니다.
    buttonType?: ButtonType // button 태그의 타입을 지정합니다. 디폴트는 button
}

const TextareaWithArrow = ({
    id,
    value,
    onChange,
    placeholder,
    initialRows = 1,
    isActive = true,
    handleButtonClick,
    buttonType = 'button',
}: TextareaWithArrowProps) => {
    return (
        <Textarea id={id} value={value} onChange={onChange} placeholder={placeholder} initialRows={initialRows}>
            <div className="flex justify-end">
                <ArrowButton type={buttonType} onClick={handleButtonClick} isActive={isActive} className="w-10 h-10" />
            </div>
        </Textarea>
    )
}

export default TextareaWithArrow
