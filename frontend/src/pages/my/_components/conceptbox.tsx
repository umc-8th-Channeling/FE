import Correction from '../../../assets/icons/correction.svg?react'
import Correction_before from '../../../assets/icons/correction_before.svg?react'
import Correction_active from '../../../assets/icons/correction_active.svg?react'
import { useState } from 'react'
import Textarea from '../../../components/Textarea'

const Conceptbox = () => {
    const MODES = {
        VIEW: 'VIEW',
        EDIT: 'EDIT',
        ACTIVE_COMPLETE: 'ACTIVE_COMPLETE',
    } as const

    type Mode = keyof typeof MODES // 'VIEW' | 'EDIT' | 'ACTIVE_COMPLETE'

    const [mode, setMode] = useState<Mode>('VIEW')
    const [value, setValue] = useState('')

    const actionMap = {
        ['VIEW']: {
            Icon: Correction,
            label: '수정',
            textClass: 'text-gray-900',
            onClick: () => setMode('EDIT'),
        },
        ['EDIT']: {
            Icon: Correction_before,
            label: '완료',
            textClass: 'text-gray-600',
            onClick: () => setMode('EDIT'),
        },
        ['ACTIVE_COMPLETE']: {
            Icon: Correction_active,
            label: '완료',
            textClass: 'text-primary-500',
            onClick: () => setMode('VIEW'),
        },
    }

    const { Icon, label, textClass, onClick } = actionMap[mode]

    return (
        <div className="mt-[40px] w-[1200px] h-[100px]">
            <div className=" flex justify-between h-[28px]">
                <div className=" text-gray-900 font-bold text-[20px] whitespace-nowrap leading-[140%] tracking-[-0.5px]">
                    채널 컨셉
                </div>

                <div className="flex gap-[4px] cursor-pointer" onClick={onClick}>
                    <Icon />
                    <div
                        className={`text-[16px] font-medium whitespace-nowrap leading-[150%] tracking-[-0.4px] ${textClass}`}
                    >
                        {label}
                    </div>
                </div>
            </div>
            <div className="mt-[16px]">
                <Textarea
                    id=""
                    value={value}
                    disabled={mode === 'VIEW'}
                    onChange={(newVal) => {
                        setValue(newVal)
                        setMode('ACTIVE_COMPLETE')
                    }}
                    placeholder="유튜버님의 채널 컨셉에 대한 설명을 입력해주세요."
                    initialRows={5}
                />
            </div>
        </div>
    )
}

export default Conceptbox
