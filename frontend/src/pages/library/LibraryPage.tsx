import { useMemo, useState } from 'react'
import RecentReportCard from './_components/RecentReportCard'
import ScrapCard from './_components/ScrapCard'
import { DUMMY_REPORT, DUMMY_SCRAP, DUMMY_SHORTS } from './dummy'
import RecentReportShortsCard from './_components/RecentReportShortsCard'
import type { LibraryItem, ScrapItem } from '../../types/library'

export default function LibraryPage() {
    const [activeTab, setActiveTab] = useState<'report' | 'scrap'>('report')
    const [subTab, setSubTab] = useState<'video' | 'shorts'>('video')

    const [reportList, setReportList] = useState<LibraryItem[]>(DUMMY_REPORT)
    const [shortsList, setShortsList] = useState<LibraryItem[]>(DUMMY_SHORTS)
    const [scrapList, setScrapList] = useState<ScrapItem[]>(DUMMY_SCRAP)

    const filteredList = useMemo(() => {
        if (activeTab === 'report' && subTab === 'video') {
            return reportList
        } else if (activeTab === 'report' && subTab === 'shorts') {
            return shortsList
        } else {
            return scrapList
        }
    }, [activeTab, subTab, reportList, shortsList, scrapList])

    // 삭제함수
    const handleDeleteReport = (id: number) => {
        setReportList((prev) => prev.filter((item) => item.id !== id))
    }
    const handleDeleteShorts = (id: number) => {
        setShortsList((prev) => prev.filter((item) => item.id !== id))
    }
    const handleDeleteScrap = (title: string) => {
        setScrapList((prev) => prev.filter((item) => item.title !== title))
    }

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
                        <span
                            className="absolute left-0 bottom-0 h-1 w-full bg-primary-500 
                        z-10 transition-all duration-300"
                        ></span>
                    )}
                </button>

                <button
                    className={`flex-1 cursor-pointer pb-3.5 text-center text-[20px] font-bold 
                        leading-[28px] tracking-[-0.5px] relative transition-colors duration-300 ${
                            activeTab === 'scrap' ? 'text-primary-500' : 'text-gray-600'
                        }`}
                    onClick={() => setActiveTab('scrap')}
                >
                    저장한 아이디어
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gray-600"></span>
                    {activeTab === 'scrap' && (
                        <span
                            className="absolute left-0 bottom-0 h-1 w-full bg-primary-500 
                        z-10 transition-all duration-300"
                        ></span>
                    )}
                </button>
            </div>

            {activeTab === 'report' && (
                <div className="flex justify-between items-center ">
                    <div className="flex gap-2 mb-6">
                        <button
                            className={`px-4 cursor-pointer py-2 rounded-lg font-bold leading-[24px] 
                                tracking-[-0.4px] transition-all duration-300 ${
                                    subTab === 'video' ? 'bg-primary-500 ' : 'bg-gray-100 '
                                }`}
                            onClick={() => setSubTab('video')}
                        >
                            동영상
                        </button>
                        <button
                            className={`px-4 cursor-pointer py-2 rounded-lg font-bold leading-[24px] 
                                tracking-[-0.4px] transition-all duration-300 ${
                                    subTab === 'shorts' ? 'bg-primary-500' : 'bg-gray-100'
                                }`}
                            onClick={() => setSubTab('shorts')}
                        >
                            Shorts
                        </button>
                    </div>

                    {subTab === 'video'
                        ? `${DUMMY_REPORT.length}개의 영상 리포트`
                        : `${DUMMY_SHORTS.length}개의 영상 리포트`}
                </div>
            )}
            {activeTab === 'scrap' && (
                <div className="flex ">
                    <p className="mb-6 text-base font-medium leading-[24px] tracking-[-0.4px] ">
                        {DUMMY_SCRAP.length}개의 스크랩
                    </p>
                </div>
            )}
            <div
                className={
                    activeTab === 'report'
                        ? subTab === 'video'
                            ? 'grid grid-cols-2 desktop:grid-cols-4 gap-6'
                            : 'grid grid-cols-3 desktop:grid-cols-6 gap-3'
                        : 'grid grid-cols-1 desktop:grid-cols-1 gap-6'
                }
            >
                {filteredList.map((item) => {
                    if (activeTab === 'scrap') {
                        const scrap = item as ScrapItem
                        return (
                            <ScrapCard key={scrap.title} item={scrap} onDelete={() => handleDeleteScrap(scrap.title)} />
                        )
                    }

                    if (subTab === 'video') {
                        const report = item as LibraryItem
                        return (
                            <RecentReportCard
                                key={report.id}
                                item={report}
                                onDelete={() => handleDeleteReport(report.id)}
                            />
                        )
                    }

                    const shorts = item as LibraryItem
                    return (
                        <RecentReportShortsCard
                            key={shorts.id}
                            item={shorts}
                            onDelete={() => handleDeleteShorts(shorts.id)}
                        />
                    )
                })}
            </div>
        </div>
    )
}
