import { useEffect } from 'react'
import { AlgorithmOptimization } from './AlgorithmOptimization'
import { ViewerExitAnalysis } from './ViewerExitAnalysis'
import { Skeleton } from './Skeleton'
import { usePollReportStatus } from '../../../../hooks/report/usePollReportStatus'
import useGetReportAnalysis from '../../../../hooks/report/useGetReportAnalysis'
import { useGetDummyAnalysis } from '../../../../hooks/report/useGetDummyReport'
import { useAuthStore } from '../../../../stores/authStore'
import { useDeleteMyReport } from '../../../../hooks/report/useDeleteMyReport'
import { useReportStore } from '../../../../stores/reportStore'

interface TabAnalysisProps {
    reportId: number
    isFromLibrary?: boolean
    isDummy?: boolean
}

export const TabAnalysis = ({ reportId, isFromLibrary = false, isDummy = false }: TabAnalysisProps) => {
    const { data: statusData } = usePollReportStatus(reportId ?? undefined, {
        enabled: !isFromLibrary && !isDummy, // isDummy 일 때는 풀링 하지 않음
    })

    // isDummy일 경우 항상 'COMPLETED'
    const status = isDummy ? 'COMPLETED' : statusData?.result?.analysisStatus
    const isCompleted = isFromLibrary || status === 'COMPLETED'
    const isFailed = status === 'FAILED'

    const { data: realData, isLoading: isRealLoading } = useGetReportAnalysis({
        reportId,
        enabled: isCompleted && !isDummy,
    })

    const { data: dummyData, isLoading: isDummyLoading } = useGetDummyAnalysis({
        reportId,
        enabled: isDummy,
    })

    const analysisData = isDummy ? dummyData : realData
    const isLoading = isDummy ? isDummyLoading : !isCompleted || isRealLoading

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

    if (isLoading || !analysisData) return <Skeleton />

    return (
        <div className="space-y-16">
            <ViewerExitAnalysis data={analysisData} />
            <AlgorithmOptimization data={analysisData} />
        </div>
    )
}
