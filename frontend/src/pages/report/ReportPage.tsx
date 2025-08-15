import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

import Refresh from '../../assets/icons/refresh_2.svg?react'
import Tabs from '../../components/Tabs'
import { TabOverview, TabAnalysis, TabIdea, GuestModal, UpdateModal, VideoSummary } from './_components'
import useGetVideoData from '../../hooks/report/useGetVideoData'
import { useReportStore } from '../../stores/reportStore'
import { VideoSummarySkeleton } from './_components/VideoSummarySkeleton'

export default function ReportPage() {
    const { reportId: reportIdParam } = useParams()
    const [searchParams] = useSearchParams()
    const videoIdParam = searchParams.get('video')

    const reportId = Number(reportIdParam)
    const videoId = Number(videoIdParam)
    const isAuth = useAuthStore((state) => state.isAuth)
    const endGenerating = useReportStore((state) => state.actions.endGenerating)

    const TABS = useMemo(
        () => [
            { index: 0, label: '개요', component: <TabOverview reportId={reportId} /> },
            { index: 1, label: '분석', component: <TabAnalysis reportId={reportId} /> },
            { index: 2, label: '아이디어', component: <TabIdea reportId={reportId} /> },
        ],
        [reportId]
    )

    const [activeTab, setActiveTab] = useState(TABS[0])
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
    const [isOpenGuestModal, setIsOpenGuestModal] = useState(false) // 전역 상태 전환 필요

    const { data: videoData, isPending } = useGetVideoData(videoId)

    // 영상 정보 조회가 성공하면 로딩 스피너를 종료
    useEffect(() => {
        if (!isPending) endGenerating()
    }, [isPending, endGenerating])

    useEffect(() => {
        setIsOpenGuestModal(!isAuth)
    }, [isAuth])

    const handleUpdateModalClick = () => setIsOpenUpdateModal(!isOpenUpdateModal)
    const handleGuestModalClick = () => setIsOpenGuestModal(!isOpenGuestModal)
    const handleResetTab = () => setActiveTab(TABS[0])

    return (
        <>
            <div className="px-6 tablet:px-[76px] py-10 desktop:py-20 space-y-10">
                {isPending ? <VideoSummarySkeleton /> : <VideoSummary data={videoData} />}
                <Tabs tabs={TABS} activeTab={activeTab} onChangeTab={setActiveTab} />
            </div>

            {isOpenGuestModal && <GuestModal onClose={handleGuestModalClick} />}

            {isOpenUpdateModal && (
                <UpdateModal handleModalClick={handleUpdateModalClick} handleResetTab={handleResetTab} />
            )}

            {/* 리포트 업데이트 버튼 */}
            <button
                onClick={handleUpdateModalClick}
                className="
                    cursor-pointer fixed bottom-6 right-6 p-4 rounded-2xl 
                    border border-primary-600 bg-primary-500 shadow-[0_0_8px_0_var(--color-primary-500)]
                "
            >
                <Refresh />
            </button>
        </>
    )
}
