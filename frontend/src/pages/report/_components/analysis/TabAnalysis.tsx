import { AlgorithmOptimization } from './AlgorithmOptimization'
import { ViewerExitAnalysis } from './ViewerExitAnalysis'
import { Skeleton } from './Skeleton'
import { usePoolReportStatus } from '../../../../hooks/report/usePollReportStatus'
import useGetReportAnalysis from '../../../../hooks/report/useGetReportAnalysis'

export const TabAnalysis = ({ reportId }: { reportId: number }) => {
    const { data: statusData } = usePoolReportStatus(reportId ?? undefined)

    const isCompleted = statusData?.result?.analysisStatus === 'COMPLETED'

    const { data: analysisData, isLoading: isAnalysisLoading } = useGetReportAnalysis({
        reportId,
        enabled: isCompleted,
    })

    const isLoading = !isCompleted || isAnalysisLoading || !analysisData

    if (isLoading) return <Skeleton />

    return (
        <div className="space-y-16">
            <ViewerExitAnalysis data={analysisData} />
            <AlgorithmOptimization data={analysisData} />
        </div>
    )
}
