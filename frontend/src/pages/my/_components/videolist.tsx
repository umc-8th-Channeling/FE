import { useState } from 'react'
import MyVideoCard from './myVideoCard'
import MyShortsCard from './myShortsCard'

export default function Videolist() {
    const [activeTab, setActiveTab] = useState<'video' | 'shorts'>('video')

    return (
        <div className="w-[1200px] h-[685px]">
            <div className="h-[28px] text-[#fff] text-[20px] font-bold">영상 리스트</div>
            <div className="flex mt-[26px]">
                <button
                    className={`px-[16px] py-[8px] text-[18px] font-bold whitespace-nowrap flex justify-center items-center border-b-2 ${
                        activeTab === 'video' ? 'text-primary-500 border-primary-500' : 'text-[#fff] border-transparent'
                    }`}
                    onClick={() => setActiveTab('video')}
                >
                    동영상
                </button>
                <button
                    className={`px-[16px] py-[8px] text-[18px] font-bold flex justify-center items-center border-b-2 ${
                        activeTab === 'shorts'
                            ? 'text-primary-500 border-primary-500'
                            : 'text-[#fff] border-transparent'
                    }`}
                    onClick={() => setActiveTab('shorts')}
                >
                    Shorts
                </button>
            </div>
            {activeTab === 'video' && (
                <div className="w-[1200px] mt-[16px] grid grid-cols-3 gap-[24px]">
                    <MyVideoCard />
                </div>
            )}
            {activeTab === 'shorts' && (
                <div className="w-[1200px] mt-[16px] grid grid-cols-6 gap-x-[12px] gap-y-[24px]">
                    <MyShortsCard />
                </div>
            )}
        </div>
    )
}
