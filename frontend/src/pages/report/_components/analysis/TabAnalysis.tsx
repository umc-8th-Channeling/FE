import { useEffect } from 'react'
import { AlgorithmOptimization } from './AlgorithmOptimization'
import { ViewerExitAnalysis } from './ViewerExitAnalysis'
import { Skeleton } from './Skeleton'
import { usePollReportStatus } from '../../../../hooks/report/usePollReportStatus'
import useGetReportAnalysis from '../../../../hooks/report/useGetReportAnalysis'
import { useAuthStore } from '../../../../stores/authStore'
import { useDeleteMyReport } from '../../../../hooks/report/useDeleteMyReport'
import { useReportStore } from '../../../../stores/reportStore'

export const TabAnalysis = ({ reportId, isFromLibrary = false }: { reportId: number; isFromLibrary?: boolean }) => {
    const { data: statusData } = usePollReportStatus(reportId ?? undefined, {
        enabled: !isFromLibrary,
    })

    const status = statusData?.result?.analysisStatus
    const isCompleted = isFromLibrary || status === 'COMPLETED'
    const isFailed = status === 'FAILED'

    const { data: analysisData, isLoading: isAnalysisLoading } = useGetReportAnalysis({
        reportId,
        enabled: isCompleted,
    })

    const user = useAuthStore((state) => state.user)
    const channelId = user?.channelId

    const { mutate: deleteReport } = useDeleteMyReport({ channelId })

    const setIsErrorTrue = useReportStore((state) => state.actions.setIsErrorTrue)

    useEffect(() => {
        if (isFailed) {
            setIsErrorTrue()
            deleteReport({ reportId })
        }
    }, [isFailed, setIsErrorTrue, reportId, deleteReport])

    const isLoading = !isCompleted || isAnalysisLoading || !analysisData

    if (isLoading) return <Skeleton />

    return (
        <div className="space-y-16">
            <ViewerExitAnalysis data={analysisData} />
            <AlgorithmOptimization data={analysisData} />
        </div>
    )
}
