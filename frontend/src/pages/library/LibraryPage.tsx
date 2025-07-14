import { useState } from 'react'
import RecentReportCard from './_components/RecentReportCard'
import ScrapCard from './_components/ScrapCard'
import { DUMMY_REPORT, DUMMY_SCRAP } from './dummy'
//import type { LibraryItem, ScrapItem } from '../../types/library'

export default function LibraryPage() {
    const [activeTab, setActiveTab] = useState<'report' | 'scrap'>('report')
    const [subTab, setSubTab] = useState<'video' | 'shorts'>('video')

    return (
        <div className="px-6 py-20 bg-gray-50 min-h-screen">
            <div className="relative flex mb-6">
                <button
                    className={`flex-1 pb-3.5 text-center text-[20px] font-bold leading-[28px] tracking-[-0.5px] relative ${
                        activeTab === 'report' ? 'text-primary-500' : 'text-gray-600'
                    }`}
                    onClick={() => setActiveTab('report')}
                >
                    최근 받아본 리포트
                    {activeTab === 'report' && (
                        <span className="absolute left-0 bottom-0 h-1 w-full bg-primary-500 z-10"></span>
                    )}
                </button>
                <button
                    className={`flex-1 pb-3.5 text-center text-[20px] font-bold leading-[28px] tracking-[-0.5px] relative ${
                        activeTab === 'scrap' ? 'text-primary-500' : 'text-gray-600'
                    }`}
                    onClick={() => setActiveTab('scrap')}
                >
                    저장한 아이디어
                    {activeTab === 'scrap' && (
                        <span className="absolute left-0 bottom-0 h-1 w-full bg-primary-500 z-10"></span>
                    )}
                </button>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gray-600"></span>
            </div>
            {activeTab === 'report' && (
                <div className="flex justify-between items-center ">
                    <div className="flex gap-2 mb-6">
                        <button
                            className={`px-4 py-2 rounded-lg font-bold leading-[24px] tracking-[-0.4px] ${
                                subTab === 'video' ? 'bg-primary-500 ' : 'bg-gray-100 '
                            }`}
                            onClick={() => setSubTab('video')}
                        >
                            동영상
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg font-bold leading-[24px] tracking-[-0.4px] ${
                                subTab === 'shorts' ? 'bg-primary-500' : 'bg-gray-100'
                            }`}
                            onClick={() => setSubTab('shorts')}
                        >
                            Shorts
                        </button>
                    </div>

                    <p className="mb-6 text-base font-medium leading-[24px] tracking-[-0.4px] ">
                        {DUMMY_REPORT.length}개의 영상 리포트
                    </p>
                </div>
            )}
            {activeTab === 'scrap' && (
                <div className="flex ">
                    <p className="mb-6 text-base font-medium leading-[24px] tracking-[-0.4px] ">
                        {DUMMY_SCRAP.length}개의 스크랩
                    </p>
                </div>
            )}
            <div className={activeTab === 'report' ? 'grid grid-cols-4 gap-6' : 'grid grid-cols-1  gap-6'}>
                {activeTab === 'report'
                    ? DUMMY_REPORT.map((item) => <RecentReportCard key={item.id} item={item} />)
                    : DUMMY_SCRAP.map((item) => <ScrapCard key={item.title} item={item} />)}
            </div>
        </div>
    )
}
