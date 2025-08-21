import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

import Refresh from '../../assets/icons/refresh_2.svg?react'
import Tabs from '../../components/Tabs'
import { TabOverview, TabAnalysis, TabIdea, UpdateModal, VideoSummary } from './_components'
import useGetVideoData from '../../hooks/report/useGetVideoData'
import { useReportStore } from '../../stores/reportStore'
import { VideoSummarySkeleton } from './_components/VideoSummarySkeleton'
import { areAllTasksTerminal, usePollReportStatus } from '../../hooks/report/usePollReportStatus'
import { useAuthStore } from '../../stores/authStore'
import { useDeleteMyReport } from '../../hooks/report/useDeleteMyReport'

export default function ReportPage() {
    const { reportId: reportIdParam } = useParams()
    const [searchParams] = useSearchParams()
    const videoIdParam = searchParams.get('video')
    const location = useLocation()

    const reportId = Number(reportIdParam)
    const videoId = Number(videoIdParam)
    const endGenerating = useReportStore((state) => state.actions.endGenerating)
    const isFromLibrary = location.state?.from === 'library'

    const user = useAuthStore((state) => state.user)
    const channelId = user?.channelId
    const { mutate: deleteReport } = useDeleteMyReport({ channelId })

    const TABS = useMemo(
        () => [
            { index: 0, label: '개요', component: <TabOverview reportId={reportId} isFromLibrary={isFromLibrary} /> },
            { index: 1, label: '분석', component: <TabAnalysis reportId={reportId} isFromLibrary={isFromLibrary} /> },
            { index: 2, label: '아이디어', component: <TabIdea reportId={reportId} isFromLibrary={isFromLibrary} /> },
        ],
        [reportId, isFromLibrary]
    )

    const [activeTab, setActiveTab] = useState(TABS[0])
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)

    const { data: videoData, isPending } = useGetVideoData(videoId)

    // 영상 정보 조회가 성공하면 로딩 스피너를 종료
    useEffect(() => {
        if (!isPending) endGenerating()
    }, [isPending, endGenerating])

    // 리포트 생성 중 페이지 이탈 시 리포트 삭제 로직
    const { data: statusData } = usePollReportStatus(reportId ?? undefined, {
        enabled: !isFromLibrary,
    })

    const statusRef = useRef(statusData)
    useEffect(() => {
        statusRef.current = statusData
    }, [statusData])

    useEffect(() => {
        return () => {
            const latestStatus = statusRef.current?.result

            if (latestStatus && !areAllTasksTerminal(latestStatus)) {
                // 페이지 이탈: PENDING 상태의 리포트를 삭제
                deleteReport({ reportId })
            }
        }
    }, [reportId, deleteReport])

    const handleUpdateModalClick = () => setIsOpenUpdateModal(!isOpenUpdateModal)
    const handleResetTab = () => setActiveTab(TABS[0])

    return (
        <>
            <div className="px-6 tablet:px-[76px] py-10 desktop:py-20 space-y-10">
                {isPending ? <VideoSummarySkeleton /> : <VideoSummary data={videoData} />}
                <Tabs tabs={TABS} activeTab={activeTab} onChangeTab={setActiveTab} />
            </div>

            {isOpenUpdateModal && (
                <UpdateModal
                    videoId={videoId}
                    handleModalClick={handleUpdateModalClick}
                    handleResetTab={handleResetTab}
                />
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
