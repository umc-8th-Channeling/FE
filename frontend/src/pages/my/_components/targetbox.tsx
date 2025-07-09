import Correction from '../../../assets/icons/correction.svg?react'
import Correction_before from '../../../assets/icons/correction_before.svg?react'
import Correction_active from '../../../assets/icons/correction_active.svg?react'
import { useState } from 'react'

const Targetbox = () => {
    const [value, setValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isFocus, setIsFocus] = useState(false)

    return (
        <div className="w-[1200px] h-[100px]">
            <div className=" flex justify-between h-[28px]">
                <div className=" text-gray-900 font-bold text-[20px] whitespace-nowrap leading-[140%] tracking-[-0.5px]">
                    시청자 타겟
                </div>
                {!isOpen && (
                    <div className="flex gap-[4px] cursor-pointer" onClick={() => setIsOpen(true)}>
                        <Correction />
                        <div
                            className={
                                'text-gray-900 text-[16px] font-medium whitespace-nowrap leading-[150%] tracking-[-0.4px]'
                            }
                        >
                            수정
                        </div>
                    </div>
                )}
                {isOpen && !isEditing && (
                    <div className="flex gap-[4px] cursor-pointer">
                        <Correction_before />
                        <div
                            className={
                                'text-gray-600 text-[16px] font-medium whitespace-nowrap leading-[150%] tracking-[-0.4px]'
                            }
                        >
                            완료
                        </div>
                    </div>
                )}
                {isOpen && isEditing && (
                    <div
                        className="flex gap-[4px] cursor-pointer"
                        onClick={() => {
                            setIsOpen(false)
                            setIsEditing(false)
                        }}
                    >
                        <Correction_active />
                        <div
                            className={
                                'text-primary-500 text-[16px] font-medium whitespace-nowrap leading-[150%] tracking-[-0.4px]'
                            }
                        >
                            완료
                        </div>
                    </div>
                )}
            </div>
            <div
                className={`mt-[16px] w-[1200px] h-[56px] p-[16px] rounded-[16px] bg-neutral-white-opacity10 placeholder-gray-600 border-[1px] ${
                    isFocus ? 'border-gray-400' : 'border-transparent'
                }`}
            >
                <textarea
                    value={value}
                    disabled={!isOpen}
                    onChange={(e) => {
                        setValue(e.target.value)
                        setIsEditing(true)
                    }}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    placeholder="유튜버님의 시청자 타겟에 대한 설명을 입력해주세요."
                    className="flex w-[1200px] h-fit outline-none resize-none leading-[150%] tracking-[-0.4px]"
                />
            </div>
        </div>
    )
}

export default Targetbox
