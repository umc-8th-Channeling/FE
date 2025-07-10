import { useState } from 'react'
import MyVideoCard from './myVideoCard'
import MyShortsCard from './myShortsCard'
import Modal from '../../../components/Modal'
import { useNavigate } from 'react-router-dom'

export default function Videolist() {
    const [activeTab, setActiveTab] = useState<'video' | 'shorts'>('video')
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()
    const getReport = () => {
        setOpen(false)
        navigate('/report')
    }

    return (
        <div className="w-[1200px] h-[685px]">
            <div className="h-[28px] text-[#fff] text-[20px] font-bold">영상 리스트</div>
            <div className="flex mt-[26px]">
                <button
                    className={`px-[16px] py-[8px] text-[18px] font-bold whitespace-nowrap flex justify-center items-center border-b-2 cursor-pointer ${
                        activeTab === 'video' ? 'text-primary-500 border-primary-500' : 'text-[#fff] border-transparent'
                    }`}
                    onClick={() => setActiveTab('video')}
                >
                    동영상
                </button>
                <button
                    className={`px-[16px] py-[8px] text-[18px] font-bold flex justify-center items-center border-b-2 cursor-pointer ${
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
                <div className="w-[1200px] mt-[16px] grid grid-cols-3 gap-[24px] cursor-pointer">
                    <MyVideoCard onClick={() => setOpen(true)} />
                    {open && (
                        <Modal
                            title="해당 영상에 대한 리포트를 받아 보시겠어요?"
                            description="‘저 맘먹으면 광태님 꼬실 수 있어요ㅎ [월간데이트 4월호 ] (ENG / JP SUB)’을 유튜버님의 타겟과 컨셉을 고려하여 분석해요."
                            onClose={() => setOpen(false)}
                        >
                            <div className="flex justify-end">
                                <div className="flex justify-between w-[214px] h-[40px] mt-[24px] items-end">
                                    <button
                                        className="w-[101px] h-[40px] text-[16px] font-bold text-gray-600 border-[1px] border-gray-300 rounded-[16px] leading-[150%] tracking-[-0.4px] cursor-pointer"
                                        onClick={() => setOpen(false)}
                                    >
                                        취소
                                    </button>
                                    <button className="w-[103px] h-[40px] text-[16px] font-bold text-gray-900 bg-primary-500 rounded-[16px] leading-[150%] tracking-[-0.4px] cursor-pointer">
                                        리포트 받기
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    )}
                </div>
            )}
            {activeTab === 'shorts' && (
                <div className="w-[1200px] mt-[16px] grid grid-cols-6 gap-x-[12px] gap-y-[24px] cursor-pointer">
                    <MyShortsCard onClick={() => setOpen(true)} />
                    {open && (
                        <Modal
                            title="해당 영상에 대한 리포트를 받아 보시겠어요?"
                            description="‘저 맘먹으면 광태님 꼬실 수 있어요ㅎ [월간데이트 4월호 ] (ENG / JP SUB)’을 유튜버님의 타겟과 컨셉을 고려하여 분석해요."
                            onClose={() => setOpen(false)}
                        >
                            <div className="flex justify-end">
                                <div className="flex justify-between w-[214px] h-[40px] mt-[24px] items-end">
                                    <button
                                        className="w-[101px] h-[40px] text-[16px] font-bold text-gray-600 border-[1px] border-gray-300 rounded-[16px] leading-[150%] tracking-[-0.4px] cursor-pointer"
                                        onClick={() => setOpen(false)}
                                    >
                                        취소
                                    </button>
                                    <button className="w-[103px] h-[40px] text-[16px] font-bold text-gray-900 bg-primary-500 rounded-[16px] leading-[150%] tracking-[-0.4px] cursor-pointer">
                                        리포트 받기
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    )}
                </div>
            )}
        </div>
    )
}
