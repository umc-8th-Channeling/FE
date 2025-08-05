import { useEffect, useState } from 'react'
import RecentReportCard from './RecentReportCard'
import RecentReportShortsCard from './RecentReportShortsCard'
import Pagination from '../../../components/Pagination'
import { DUMMY_REPORT, DUMMY_SHORTS } from '../dummy'
import type { LibraryItem } from '../../../types/library'

export default function ReportTab() {
    const [subTab, setSubTab] = useState<'video' | 'shorts'>('video')
    const [videoPage, setVideoPage] = useState(1)
    const [shortsPage, setShortsPage] = useState(1)

    const [reportList, setReportList] = useState<LibraryItem[]>(DUMMY_REPORT)
    const [shortsList, setShortsList] = useState<LibraryItem[]>(DUMMY_SHORTS)

    const itemsPerPage = 12
    const isVideo = subTab === 'video'

    const data = isVideo ? reportList : shortsList
    const currentPage = isVideo ? videoPage : shortsPage
    const offset = (currentPage - 1) * itemsPerPage
    const currentItems = data.slice(offset, offset + itemsPerPage)

    // 삭제 핸들러
    const handleDeleteReport = (id: number) => {
        setReportList((prev) => prev.filter((item) => item.id !== id))
    }
    const handleDeleteShorts = (id: number) => {
        setShortsList((prev) => prev.filter((item) => item.id !== id))
    }

    useEffect(() => {
        const totalPages = Math.ceil(data.length / itemsPerPage)
        if (currentPage > totalPages && totalPages > 0) {
            if (isVideo) setVideoPage(totalPages)
            else setShortsPage(totalPages)
        }
    }, [data.length, itemsPerPage, currentPage, isVideo])

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <button
                        className={`px-4 cursor-pointer py-2 rounded-lg font-bold leading-[24px] 
                            tracking-[-0.4px] transition-all duration-300 ${
                                isVideo ? 'bg-primary-500 ' : 'bg-gray-100 '
                            }`}
                        onClick={() => setSubTab('video')}
                    >
                        동영상
                    </button>
                    <button
                        className={`px-4 cursor-pointer py-2 rounded-lg font-bold leading-[24px] 
                            tracking-[-0.4px] transition-all duration-300 ${
                                !isVideo ? 'bg-primary-500' : 'bg-gray-100'
                            }`}
                        onClick={() => setSubTab('shorts')}
                    >
                        Shorts
                    </button>
                </div>

                <div className="text-base font-medium leading-[24px] tracking-[-0.4px]">
                    {data.length}개의 영상 리포트
                </div>
            </div>

            {/* 카드 리스트 */}
            <div
                className={
                    isVideo
                        ? 'grid grid-cols-2 desktop:grid-cols-4 gap-6'
                        : 'grid grid-cols-3 desktop:grid-cols-6 gap-3'
                }
            >
                {currentItems.map((item) =>
                    isVideo ? (
                        <RecentReportCard key={item.id} item={item} onDelete={() => handleDeleteReport(item.id)} />
                    ) : (
                        <RecentReportShortsCard
                            key={item.id}
                            item={item}
                            onDelete={() => handleDeleteShorts(item.id)}
                        />
                    )
                )}
            </div>

            <div className="flex flex-col pt-[40px] justify-center items-center gap-[8px] self-stretch">
                <Pagination
                    key={`pagination-${subTab}`}
                    totalItems={Math.max(1, data.length)} //최소 1개 보장
                    itemCountPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onChangePage={isVideo ? setVideoPage : setShortsPage}
                />
            </div>
        </>
    )
}
