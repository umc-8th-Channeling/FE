import Correction from '../../../assets/icons/correction.svg?react'
import { useState } from 'react'

const Targetbox = () => {
    const [value, setValue] = useState('')

    return (
        <div className="w-[1200px] h-[100px]">
            <div className=" flex justify-between h-[28px]">
                <div className=" text-gray-900 font-bold text-[20px] whitespace-nowrap">시청자 타겟</div>
                <div className="flex gap-[4px]">
                    <Correction />
                    <div className="text-gray-900 text-[16px] whitespace-nowrap">수정</div>
                </div>
            </div>
            <div className=" mt-[16px] w-[1200px] h-[56px] p-[16px] rounded-[16px] bg-neutral-white-opacity10 placeholder-gray-600">
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="유튜버님의 시청자 타겟에 대한 설명을 입력해주세요."
                    className="flex w-[1200px] h-fit outline-none resize-none  "
                />
            </div>
        </div>
    )
}

export default Targetbox
