import { useState } from 'react'
import Textarea from '../../../components/Textarea'
import { EditButton } from '../../../components/EditButton'

type Mode = 'VIEW' | 'EDIT' | 'ACTIVE_COMPLETE'

const Conceptbox = () => {
    const [mode, setMode] = useState<Mode>('VIEW')
    const [value, setValue] = useState('')

    const actionMap = {
        ['VIEW']: {
            buttonColor: 'text-gray-900',
            label: '수정',
            onClick: () => setMode('EDIT'),
            isDisabled: true,
        },
        ['EDIT']: {
            buttonColor: 'text-gray-600',
            label: '완료',
            onClick: () => setMode('EDIT'),
            isDisabled: false,
        },
        ['ACTIVE_COMPLETE']: {
            buttonColor: 'text-primary-500',
            label: '완료',
            onClick: () => setMode('VIEW'),
            isDisabled: false,
        },
    }

    const { buttonColor, label, onClick, isDisabled } = actionMap[mode]

    return (
        <div className="mt-[40px] w-full">
            <div className="flex justify-between h-[28px]">
                <div className="text-gray-900 font-bold text-[20px] whitespace-nowrap leading-[140%] tracking-[-0.5px]">
                    채널 컨셉
                </div>
                <EditButton onClick={onClick} buttonColor={buttonColor} label={label} />
            </div>
            <div className="mt-[16px]">
                <Textarea
                    id=""
                    value={value}
                    disabled={isDisabled}
                    onChange={(newVal) => {
                        setValue(newVal)
                        setMode('ACTIVE_COMPLETE')
                    }}
                    placeholder="유튜버님의 채널 컨셉에 대한 설명을 입력해주세요."
                    initialRows={5}
                    className="w-full min-h-[120px] mobile:text-[16px]"
                />
            </div>
        </div>
    )
}

export default Conceptbox
