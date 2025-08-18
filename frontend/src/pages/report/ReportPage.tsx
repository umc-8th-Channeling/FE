import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import Refresh from '../../assets/icons/refresh_2.svg?react'
import Tabs from '../../components/Tabs'
import { TabOverview, TabAnalysis, TabIdea, UpdateModal, VideoSummary, GenerateErrorModal } from './_components'
import { VideoSummarySkeleton } from './_components/VideoSummarySkeleton'
import useGetVideoData from '../../hooks/report/useGetVideoData'
import { useReportStore } from '../../stores/reportStore'
import { useQuery } from '@tanstack/react-query'
import { getReportStatus } from '../../api/report'
import { usePollReportStatus } from '../../hooks/report/usePollReportStatus'
import { GeneratingModal } from './_components/GeneratingModal'

export default function ReportPage() {
    const navigate = useNavigate()

    const { reportId: reportIdParam } = useParams()
    const reportId = Number(reportIdParam)
    const [searchParams] = useSearchParams()
    const videoIdParam = searchParams.get('video')

    const currentReportStatus = useReportStore((state) => state.statuses[reportId])
    const updateReportStatus = useReportStore((state) => state.actions.updateReportStatus)
    const pendingReportIds = useReportStore((state) => state.pendingReportIds)

    // ✅ 1. 페이지 진입 시 스토어에 상태가 없을 때만 서버에 일회성으로 상태를 조회합니다.
    const { data: initialStatusData, isError: isInvalidReportError } = useQuery({
        queryKey: ['reportStatus', reportId, 'initialCheck'],
        queryFn: () => getReportStatus({ reportId }),
        enabled: !currentReportStatus,
        retry: false,
        refetchOnWindowFocus: false,
        // select를 사용하여 data.result만 반환받도록 합니다.
        select: (data) => data.result,
    })

    // ✅ 3. 조회 성공 시, 이 데이터를 전역 스토어에 업데이트합니다.
    useEffect(() => {
        if (initialStatusData) {
            updateReportStatus(reportId, initialStatusData)
        }
    }, [initialStatusData, reportId, updateReportStatus])

    const needsPolling = useMemo(() => pendingReportIds.includes(reportId), [pendingReportIds, reportId])

    // ✅ 3. needsPolling이 true일 때만 '로컬 폴링'을 활성화합니다.
    usePollReportStatus(reportId, { enabled: needsPolling })

    // ✅ 2. 실패 여부를 두 가지 경우로 판단합니다.
    // Case 1: 스토어에 'FAILED' 상태가 기록되어 있는 경우
    // 1. '생성 실패' 상태 계산 (기존과 동일)
    const isKnownToHaveFailed = useMemo(() => {
        if (!currentReportStatus) return false
        const { overviewStatus, analysisStatus, ideaStatus } = currentReportStatus
        return overviewStatus === 'FAILED' || analysisStatus === 'FAILED' || ideaStatus === 'FAILED'
    }, [currentReportStatus])

    // Case 2: 스토어에 정보가 없어 서버에 물어보니 에러(404 등)가 발생한 경우
    const isInvalidOrDeleted = isInvalidReportError
    const shouldShowError = isKnownToHaveFailed || isInvalidOrDeleted

    // ✅ 2. '생성 중' 상태 계산
    // 전역 pending 목록에 현재 리포트 ID가 있으면 '생성 중'으로 판단합니다.
    const isGenerating = useMemo(() => pendingReportIds.includes(reportId), [pendingReportIds, reportId])

    const handleCloseErrorModal = () => navigate('/', { replace: true })

    const videoId = Number(videoIdParam)
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

            {/* 생성 실패 시 에러 모달 */}
            {/* {shouldShowError && <GenerateErrorModal onClose={handleCloseErrorModal} />} */}
            {/* ✅ 3. 우선순위에 따라 모달을 렌더링합니다. */}
            {shouldShowError ? (
                // 1순위: 에러 모달
                <GenerateErrorModal onClose={handleCloseErrorModal} />
            ) : isGenerating ? (
                // 2순위: 생성 중 모달
                <GeneratingModal />
            ) : null}
        </>
    )
}
