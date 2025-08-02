import { useState } from 'react'
import ReportTab from './_components/ReportTab'
import IdeaTab from './_components/IdeaTab'

export default function LibraryPage() {
    const [activeTab, setActiveTab] = useState<'report' | 'idea'>('report')

    return (
        <div className="px-6 tablet:px-[76px] py-20">
            <div className="relative flex mb-6">
                <button
                    className={`flex-1 cursor-pointer pb-3.5 text-center text-[20px] font-bold 
                        leading-[28px] tracking-[-0.5px] relative transition-colors duration-300 ${
                            activeTab === 'report' ? 'text-primary-500' : 'text-gray-600'
                        }`}
                    onClick={() => setActiveTab('report')}
                >
                    최근 받아본 리포트
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gray-600"></span>
                    {activeTab === 'report' && (
                        <span className="absolute left-0 bottom-0 h-1 w-full bg-primary-500 z-10 transition-all duration-300" />
                    )}
                </button>

                <button
                    className={`flex-1 cursor-pointer pb-3.5 text-center text-[20px] font-bold 
                        leading-[28px] tracking-[-0.5px] relative transition-colors duration-300 ${
                            activeTab === 'idea' ? 'text-primary-500' : 'text-gray-600'
                        }`}
                    onClick={() => setActiveTab('idea')}
                >
                    저장한 아이디어
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gray-600"></span>
                    {activeTab === 'idea' && (
                        <span className="absolute left-0 bottom-0 h-1 w-full bg-primary-500 z-10 transition-all duration-300" />
                    )}
                </button>
            </div>

            {/* 각 탭 렌더링 */}
            {activeTab === 'report' ? <ReportTab /> : <IdeaTab />}
        </div>
    )
}
