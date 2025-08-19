import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import Refresh from '../../assets/icons/refresh_2.svg?react'
import Tabs from '../../components/Tabs'
import { TabOverview, TabAnalysis, TabIdea, UpdateModal, VideoSummary, GenerateErrorModal } from './_components'
import { VideoSummarySkeleton } from './_components/VideoSummarySkeleton'
import useGetVideoData from '../../hooks/report/useGetVideoData'
import { useReportStore } from '../../stores/reportStore'
import { useGetInitialReportStatus, usePollReportStatus } from '../../hooks/report/usePollReportStatus'
import { GeneratingModal } from './_components/GeneratingModal'

export default function ReportPage() {
    const navigate = useNavigate()

    const { reportId: reportIdParam } = useParams()
    const reportId = Number(reportIdParam)
    const [searchParams] = useSearchParams()
    const videoIdParam = searchParams.get('video')
    const videoId = Number(videoIdParam)

    const endGenerating = useReportStore((state) => state.actions.endGenerating)
    const currentReportStatus = useReportStore((state) => state.statuses[reportId])
    const pendingReportIds = useReportStore((state) => state.pendingReportIds)

    // ✅ 페이지 진입 시 해당 리포트 ID로 상태가 없을 때만 일회성으로 서버에 상태 조회
    const { isInvalidReportError } = useGetInitialReportStatus(reportId)

    // ✅ 해당 리포트 ID가 PENDING 중일 경우 로컬 폴링
    const needsPolling = useMemo(() => pendingReportIds.includes(reportId), [pendingReportIds, reportId])
    usePollReportStatus(reportId, { enabled: needsPolling })

    // ✅ 리포트 생성에 실패한 경우
    const isKnownToHaveFailed = useMemo(() => {
        if (!currentReportStatus) return false
        const { overviewStatus, analysisStatus, ideaStatus } = currentReportStatus
        return overviewStatus === 'FAILED' || analysisStatus === 'FAILED' || ideaStatus === 'FAILED'
    }, [currentReportStatus])

    const isInvalidOrDeleted = isInvalidReportError
    const shouldShowError = isKnownToHaveFailed || isInvalidOrDeleted

    // ✅ 리포트가 생성 중인 경우
    const isGenerating = useMemo(() => pendingReportIds.includes(reportId), [pendingReportIds, reportId])

    const handleCloseErrorModal = () => navigate('/', { replace: true })

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

    const { data: videoData, isPending } = useGetVideoData(videoId)

    // 영상 정보 조회가 성공하면 로딩 스피너를 종료
    useEffect(() => {
        if (!isPending) endGenerating()
    }, [isPending, endGenerating])

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

            {/* 우선순위에 따른 모달 렌더링 */}
            {shouldShowError ? (
                // 1순위: 생성 실패 에러 모달
                <GenerateErrorModal onClose={handleCloseErrorModal} />
            ) : isGenerating ? (
                // 2순위: 생성 중 모달
                <GeneratingModal />
            ) : null}
        </>
    )
}
