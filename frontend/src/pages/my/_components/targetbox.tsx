import Correction from '../../../assets/icons/correction.svg?react'
import Correction_before from '../../../assets/icons/correction_before.svg?react'
import Correction_active from '../../../assets/icons/correction_active.svg?react'
import { useState } from 'react'

type Mode = 'VIEW' | 'EDIT' | 'ACTIVE_COMPLETE'

const Targetbox = () => {
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
        <div className="w-full">
            <div className="flex flex-row justify-between h-[28px]">
                <div className=" text-gray-900 font-bold text-[20px] whitespace-nowrap leading-[140%] tracking-[-0.5px]">
                    시청자 타겟
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
            <div
                className={`mt-[16px] w-full p-[16px] rounded-[16px] text-[16px] placeholder-gray-600 bg-neutral-white-opacity10 border-[1px] border-transparent focus-within:border-gray-400`}
            >
                <input
                    value={value}
                    disabled={mode === 'VIEW'}
                    onChange={(e) => {
                        setValue(e.target.value)
                        setMode('ACTIVE_COMPLETE')
                    }}
                    className="
                        flex px-2 w-full h-fit outline-none resize-none 
                        text-[14px] leading-[150%] tracking-[-0.35px] tablet:text-[16px] tablet:tracking-[-0.4px]
                    "
                    placeholder="유튜버님의 시청자 타겟에 대한 설명을 입력해주세요."
                />
            </div>
        </div>
    )
}

export default Targetbox
